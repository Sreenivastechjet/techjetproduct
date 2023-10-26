const Auth = require("../model/authModel");
const bcrypt = require("bcryptjs");
const { createAccToken, createRefToken } = require("../util/token");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password, number } = req.body;

      const passHash = await bcrypt.hash(password, 10);

      const newUser = await Auth({
        name,
        email,
        number,
        password: passHash,
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
        maxAge: 1 * 24 * 60 * 60 * 1000
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
  profileUpdate: async (req, res) => {
    try {
      let id = req.params.id;
      let { name, email, mobile } = req.body;
      await Auth.findOneAndUpdate({ _id: id }, { name, email, mobile });
      return res.status(200).json({ msg: "userProfile Updated" });
      // res.json(req.body)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      let { email, password } = req.body;

      let extUser = await Auth.findOne({ email });
      if (!extUser)
        return res.status(400).json({ msg: "User doestn't exists." });

      let newPass = bcrypt.hash(password, 10);

      await Auth.findByIdAndUpdate(
        { id: extUser._id },
        {
          password: newPass,
        }
      );

      return res.status(200).json({ msg: "Password updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = authController;
