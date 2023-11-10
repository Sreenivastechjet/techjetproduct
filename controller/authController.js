const Auth = require("../model/authModel");
const bcrypt = require("bcryptjs");
const { createAccToken, createRefToken } = require("../util/token");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, number, employeeId, role } = req.body;

      const passHash = await bcrypt.hash(password, 10);

      const newUser = await Auth({
        name,
        email,
        number,
        password: passHash,
        employeeId,
        role,
      });

      await newUser.save();
      res.status(200).json({ msg: "User registered Succesfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const extUser = await Auth.findOne({ email });
      if (!extUser)
        return res.status(400).json({ msg: "user doesn't exists." });

      const isMatch = await bcrypt.compare(password, extUser.password);
      if (!isMatch)
        return res.status(400).json({ msg: "password doesn't match" });

      const accessToken = createAccToken({ id: extUser._id });
      const refreshToken = createRefToken({ id: extUser._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        signed: true,
        path: `/api/v1/auth/refreshToken`,
        maxAge: 1 * 60 * 60 * 1000,
        sameSite: "none",
        secure: true,
      });

      res.json({ accessToken });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  refreshToken: async (req, res) => {
    try {
      const ref = req.signedCookies.refreshToken;
      if (!ref)
        return res.status(400).json({ msg: "Session Expired.. Login Again.." });

      jwt.verify(ref, process.env.REF_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.status(400).json({ msg: "Invalid Auth..Login Again.." });
        const accessToken = createAccToken({ id: user.id });
        res.json({ accessToken });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshToken", { path: `/api/v1/auth/refreshToken` });
      return res.status(200).json({ msg: "Successfully Logout" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUserInfo: async (req, res) => {
    try {
      const data = await Auth.findById({ _id: req.user.id }).select(
        "-password"
      );
      res.json({ user: data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getempdetails: async (req, res) => {
    const { id } = req.params;

    try {
      const data = await Auth.findById({ _id: id }).select("-password");
      res.json({ user: data });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  EmpUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, number, role, employeeId } = req.body.data;
      const updatedFields = {
        name,
        email,
        number,
        role,
        employeeId,
      };
      const updatedUser = await Auth.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
      return res.status(200).json({ msg: "userProfile Updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      let { email, oldPassword, newPassword } = req.body;

      let existingUser = await Auth.findOne({ email });
      if (!existingUser) {
        return res.status(400).json({ msg: "User doesn't exist." });
      }

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        existingUser.password
      );

      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid old password." });
      }

      let newPass = await bcrypt.hash(newPassword, 10);

      await Auth.findByIdAndUpdate(
        { _id: existingUser._id },
        {
          password: newPass,
        }
      );

      return res.status(200).json({ msg: "Password updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  uploadProfileImg: async (req, res) => {
    try {
      const file = req.file;
      const id = req.params.id;

      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }

      await Auth.findOneAndUpdate({ _id: id }, { image: file.filename });
      return res.status(200).json({ msg: "Profile Pic Updated" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllemplist: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const pageSize = parseInt(req.query.pageSize) || 8;
      const searchKey = req.query.search || "";
      const searchRegex = new RegExp(searchKey, "i");

      const totalEmp = await Auth.countDocuments({
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      });
      const skip = (page - 1) * pageSize;
      const limit = pageSize;

      const emplist = await Auth.find({
        $or: [
          { name: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      })
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit);
      const response = {
        emplist: emplist,
        page: page,
        pageSize: pageSize,
        totallist: totalEmp,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  empminifiedlist: async (req, res) => {
    try {
      const search = req.query.search || "";
      const page = req.query.page || 1;
      const pageSize = 60;

      let filter = {};

      if (search) {
        filter = {
          $or: [
            // { email: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: "i" } },
          ],
        };
      }

      const data = await Auth.find(filter, { _id: 1, email: 1, name: 1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      const options = data.map((item) => ({
        key: item._id,
        value: item.email,
        label: item.name,
      }));

      res.status(200).json({
        options,
        additional: { page: parseInt(page) + 1 },
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  addTodo: async (req, res) => {
    try {
      const user = await Auth.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const { title, date } = req.body;
      const newTodo = {
        title: title,
        date: date,
      };

      user.mytodo.push(newTodo);
      await user.save();

      return res.status(200).json("Todo created successfully");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getalltodo: async (req, res) => {
    try {
      const user = await Auth.findById(req.params.id);
      const userTodos = user.mytodo.sort((a, b) => b.timestamp - a.timestamp);

      return res.status(200).json(userTodos);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updatetodo: async (req, res) => {
    try {
      const { id, todoId } = req.params;
      const { title, date } = req.body;

      const user = await Auth.findById(id);

      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }

      const mytodo = user.mytodo.id(todoId);

      if (!mytodo) {
        return res.status(400).json({ msg: "MyTodo not found" });
      }
      mytodo.title = title;
      mytodo.date = date;

      await user.save();

      return res.status(200).json("ToDo Updated successfully");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deletetodo: async (req, res) => {
    try {
      const { id, todoId } = req.params;
      const user = await Auth.findById(id);
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const myTodoIndex = user.mytodo.findIndex(
        (todo) => todo._id.toString() === todoId
      );

      if (myTodoIndex === -1) {
        return res.status(400).json({ msg: "MyTodo not found" });
      }

      user.mytodo.splice(myTodoIndex, 1);
      await user.save();
      return res.status(200).json("ToDo deleted successfully");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = authController;
