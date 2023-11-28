const Lead = require("../model/leadModel");
const fs = require("fs");
const path = require("path");
const ExcelJS = require("exceljs");
const sendMail = require("../middleware/mail");
const jwt = require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const leadController = {
  createLead: async (req, res) => {
    const { createdby } = req.body;
    try {
      let lead = await Lead.create(req.body);
      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Lead Created",
            newValue: "Lead Created",
          },
        ],
      });
      lead.leadstage = "New Lead";

      await lead.save();
      res.status(200).json({ msg: "Lead created Successfully" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getAllLeads: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 8;
      // Define search criteria
      const searchKey = req.query.search || "";
      const searchRegex = new RegExp(searchKey, "i"); // Case-insensitive search
      // Count total leads matching the search criteria
      const totalLeads = await Lead.countDocuments({
        $or: [
          { leadname: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      });
      // Calculate skip and limit for pagination
      const skip = (page - 1) * pageSize;
      const limit = pageSize;
      // Find leads matching the search criteria with pagination
      const leads = await Lead.find({
        $or: [
          { leadname: { $regex: searchRegex } },
          { email: { $regex: searchRegex } },
        ],
      })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      // Response object
      const response = {
        leads: leads,
        page: page,
        pageSize: pageSize,
        totalLeads: totalLeads,
      };
      res.status(200).json(response);
      // let lead = await Lead.find()
      // res.status(200).json({ leads: lead, length: lead.length })
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getEveryLeads: async (req, res) => {
    try {
      const leads = await Lead.find();

      res.status(200).json({ leads });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },

  getSingleLead: async (req, res) => {
    try {
      let lead = await Lead.findById({ _id: req.params.id });
      res.status(200).json({ lead });
    } catch (error) {
      res.status(400).json({ msg: "Something went wrong" });
    }
  },

  patchFile: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const createdby = req.body.createdby;

      if (!file) {
        return res.status(400).json({ msg: "No file provided" });
      }

      const formData = await Lead.findById(id);

      if (!formData) {
        return res.status(404).json({ msg: "Form data not found" });
      }

      // Update the formData document with the new image information
      formData.images.push({
        filename: file.filename,
        timestamp: new Date(),
      });

      formData.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "file attached",
            newValue: file.filename,
          },
        ],
      });

      await formData.save();
      res
        .status(200)
        .json({ message: "File uploaded and form data updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  deletefiles: async (req, res) => {
    try {
      const { id, filename } = req.params;

      const formData = await Lead.findById(id);

      if (!formData) {
        return res.status(404).json({ msg: "Form data not found" });
      }

      // Find the index of the image to delete
      const imageIndex = formData.images.findIndex(
        (image) => image.filename === filename
      );

      if (imageIndex === -1) {
        return res.status(404).json({ msg: "Image not found" });
      }

      // Remove the image from the array
      formData.images.splice(imageIndex, 1);

      // Delete the file from the server
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "Images",
        filename
      );
      fs.unlinkSync(imagePath);

      await formData.save();

      res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  viewfile: async (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, `../public/Images`, filename);

    res.sendFile(filePath);
  },

  downloadfile: async (req, res) => {
    const filename = req.params.filename;
    // Assuming your files are stored in the 'public/Images' directory
    const filePath = path.join(__dirname, "../public/Images", filename);

    if (fs.existsSync(filePath)) {
      res.download(filePath, filename, (err) => {
        if (err) {
          // Handle errors, such as file not found or download failure
          res.status(404).send("File not found");
        }
      });
    } else {
      res.status(404).send("File not found");
    }
  },

  addnotes: async (req, res) => {
    try {
      const { id } = req.params;
      const { newnote, createdby } = req.body;

      const formData = await Lead.findById(id);
      if (!formData) {
        return res.status(404).json({ msg: "Form data not found" });
      }

      formData.notes.push({
        note: newnote,
        timestamp: new Date(),
      });

      formData.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "notes",
            newValue: newnote,
          },
        ],
      });

      await formData.save();

      res
        .status(200)
        .json({ msg: "Note added to the form data successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateLead: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { createdby , ...updatedData} = req.body;
      

      const lead = await Lead.findByIdAndUpdate(leadId, updatedData, {
        new: true,
      });

      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }
      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Update Lead Details",
            newValue: "Some Fields Updated",
          },
        ],
      });
      const updatedLead = await lead.save();

      return res.status(200).json({ msg: "Lead Updated Succesfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  leadfallowup: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { assignTo, fallowUp, createdby, fallowUpDate, fallowUpTime } =
        req.body;

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }

      lead.leadstatus.push({
        fallowUp: fallowUp,
        assignTo: assignTo,
        fallowUpDate: fallowUpDate,
        fallowUpTime: fallowUpTime,
        timestamp: new Date(),
      });

      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "FallowUp",
            newValue: fallowUp,
          },
        ],
      });

      // Save the updated lead
      const updatedLead = await lead.save();

      res.status(200).json({ msg: "Lead updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  updateLeadStatus: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { status, createdby } = req.body;

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }
      lead.status = status;

      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Status Updated",
            newValue: status,
          },
        ],
      });

      const updatedLead = await lead.save();

      res.status(200).json({ msg: "Lead updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  updateLeadStage: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { leadstage, createdby } = req.body;

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }
      lead.leadstage = leadstage;

      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Lead stage Updated",
            newValue: leadstage,
          },
        ],
      });
      const updatedLead = await lead.save();

      res.status(200).json({ msg: "Lead updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  updateManager: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { manager, createdby } = req.body;

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }
      lead.projectmanager = manager;

      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Manager Assigned",
            newValue: manager.lable,
          },
        ],
      });

      // Save the updated lead
      const updatedLead = await lead.save();

      res.status(200).json({ msg: "Lead updated successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  updateAssignee: async (req, res) => {
    try {
      const leadId = req.params.id;
      const { assignees, createdby } = req.body;

      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      lead.assignees = assignees;

      lead.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Sales Executive Assigned",
            newValue: "Assignees",
          },
        ],
      });

      // Save the updated lead
      const updatedLead = await lead.save();

      res.status(200).json({ message: "Lead updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  exportLeadsExcel: async (req, res) => {
    try {
      const leads = await Lead.find(
        {},
        "leadname leadsource businessdetails number email leadstage"
      );

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Leads");

      worksheet.columns = [
        { header: "Lead Name", key: "leadname", width: 20 },
        { header: "Lead Source", key: "leadsource", width: 20 },
        { header: "Business Details", key: "businessdetails", width: 30 },
        { header: "Number", key: "number", width: 20 },
        { header: "Email", key: "email", width: 30 },
        { header: "Lead Stage", key: "leadstage", width: 20 },
      ];
      worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "0000FF" },
        };
        cell.font = {
          bold: true,
          size: 12,
          color: { argb: "FFFFFF" },
        };
      });

      worksheet.addRows(leads);

      // Set the response headers for Excel file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", "attachment; filename=leads.xlsx");

      // Pipe the Excel data directly to the response
      await workbook.xlsx.write(res);

      res.end();
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while exporting to Excel." });
    }
  },

  sendMail: async (req, res) => {
    try {
      const { sentby, to, subject, content, text } = req.body;
      const id = req.params.id;

      const data = await Lead.findById(id);
      if (!data) {
        return res.status(404).json({ msg: "Lead data not found" });
      }

      data.emails.push({
        sentby: sentby,
        to: to,
        subject: subject,
        content: content,
        timestamp: new Date(),
      });
      data.history.push({
        createdby: sentby,
        timestamp: new Date(),
        changes: [
          {
            field: "email",
            newValue: content,
          },
        ],
      });

      await data.save();

      let mailRes = sendMail(to, subject, content, text);

      res.status(200).json({ msg: "Mail sent successfully" });
    } catch (error) {
      res.status(500).json({ error: "mail not sent try again sometime later" });
    }
  },
  bulkUpload: async (req, res) => {
    try {
      const excelData = req.body.data;
      if (!Array.isArray(excelData) || excelData.length === 0) {
        return res.status(400).json({ msg: "Invalid or empty data" });
      }
      // Check for duplicate emails and numbers
      const uniqueEmails = new Set();
      const uniqueNumbers = new Set();
      let duplicatesFound = false;

      for (const data of excelData) {
        if (uniqueEmails.has(data.email) || uniqueNumbers.has(data.number)) {
          duplicatesFound = true;
          break;
        }
        uniqueEmails.add(data.email);
        uniqueNumbers.add(data.number);
      }

      if (duplicatesFound) {
        return res
          .status(400)
          .json({ msg: "Duplicate email or number found in the data" });
      }

      // Check for duplicates in the database
      const existingLeads = await Lead.find({
        $or: [
          { email: { $in: Array.from(uniqueEmails) } },
          { number: { $in: Array.from(uniqueNumbers) } },
        ],
      });

      if (existingLeads.length > 0) {
        return res
          .status(400)
          .json({ msg: "Duplicate email or number found in the database" });
      }

      let lead = await Lead.insertMany(excelData, { validateBeforeSave: true });

      if (!lead || !Array.isArray(lead) || lead.length === 0) {
        return res.status(400).json({ msg: "Lead not created" });
      }

      const historyItems = excelData.map((data) => {
        return {
          // user: "name", // ID of the user who made the change
          timestamp: new Date(),
          changes: [
            {
              field: "Lead Created",
              newValue: "Lead Created",
            },
          ],
        };
      });

      for (let i = 0; i < lead.length; i++) {
        lead[i].history.push(historyItems[i]);
        lead[i].leadstage = "New Lead";
        await lead[i].save();
      }
      res
        .status(200)
        .json({ msg: "Leads data uploaded and saved successfully" });
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  },
  getLeadsByDates: async (req, res) => {
    const { period } = req.params;
    let startDate, endDate;

    if (period === "today") {
      startDate = new Date();
      startDate.setHours(0, 0, 0, 0); // Beginning of the day
      endDate = new Date();
    } else if (period === "this-month") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (period === "this-year") {
      const now = new Date();
      startDate = new Date(now.getFullYear(), 0, 1);
      endDate = new Date(now.getFullYear(), 11, 31);
    } else {
      return res.status(400).json({ error: "Invalid time period" });
    }

    try {
      const count = await Lead.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }, // Find leads within the specified time period
      });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  shedulemeeting: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        organiser,
        subject,
        participants,
        meetingtype,
        start,
        end,
        meetlink,
      } = req.body;
      const formData = await Lead.findById(id);
      if (!formData) {
        return res.status(404).json({ msg: "Lead Data not found" });
      }

      formData.meetings.push({
        organiser: organiser,
        subject: subject,
        participants: participants,
        start: start,
        end: end,
        meetingtype: meetingtype,
        meetlink: meetlink,
        timestamp: new Date(),
      });

      formData.history.push({
        createdby: organiser,
        timestamp: new Date(),
        changes: [
          {
            field: "meeting",
            newValue: subject,
          },
        ],
      });

      await formData.save();

      res
        .status(200)
        .json({ msg: "Note added to the form data successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  patchAgreement: async (req, res) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const createdby = req.body.createdby;

      if (!file) {
        return res.status(400).json({ msg: "No file provided" });
      }

      const formData = await Lead.findByIdAndUpdate(
        id,
        { agreement: file.filename },
        { new: true }
      );
      formData.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Agreement Attached",
            newValue: file.filename,
          },
        ],
      });
      await formData.save();
      res
        .status(200)
        .json({ msg: "File uploaded and form data updated successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  sendVerificationMailLink: async (req, res) => {
    try {
      const { id } = req.params;
      const {pdfLink,createdby, email, name } = req.body;
      if (!pdfLink) {
        return res.status(400).json({ msg: "No file provided" });
      }

      const formData = await Lead.findByIdAndUpdate(id);
      const invitedDate = new Date()

      const secret = JWT_SECRET + id;

      const token = jwt.sign({ id: id }, secret, { expiresIn: "12h" });
      const link = `http://localhost:3000/customer/${id}/${pdfLink}/${token}`;
      const to = email;
      const subject = "Verification Link";
      const content = `Please click on the link and verify : ${link}`;
      const text = `Please click on the link and verify : ${link}`;

      await sendMail(to, subject, text, content);

      formData.history.push({
        createdby: createdby,
        timestamp: new Date(),
        changes: [
          {
            field: "Verify link sent",
            newValue:`sent to ${email}`,
          },
        ],
      });
      formData.invitedby = createdby 
      formData.invitedDate = invitedDate 
      formData.invitedemail = email
      formData.invitedname = name
      await formData.save();
      res.status(200).json({ msg: "Verification link sent successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  attachSignature: async (req, res) => {
    try {
      const { id, token } = req.params;
      const file = req.file;
      const createdby = req.body.createdby;

      if (!file) {
        return res.status(400).json({ msg: "No file provided" });
      }

      const secret = JWT_SECRET + id;
      try {
        const verified = jwt.verify(token, secret);
        const formData = await Lead.findByIdAndUpdate(
          id,
          { signature: file.filename, signatureverifieddate: new Date() },
          { new: true }
        );
  
        formData.history.push({
          createdby: "Client",
          timestamp: new Date(),
          changes: [
            {
              field: "Signature Attached",
              newValue: file.filename,
            },
          ],
        });
        await formData.save();
        res.status(200).json({ msg: "Signature uploaded updated successfully" });
      } catch (error) {
        return res.status(500).json({ msg:"Something went wrong" });
      }
    
      
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  generateOtp: async (req, res) => {
    try {
      const { id, token } = req.params;
      const email = req.body.data

      // Generate a random 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();      
      
      const existingLead = await Lead.findOne({ email : email });
      if (!existingLead) {
        return res.status(400).json({ msg: "Email doesn't exist." });
      }
      const secret = JWT_SECRET + id;
      const verified = jwt.verify(token, secret);
      if (!verified) { 
        return res.status(400).json({ msg: "Token expired" });
      }
     const lead =  await Lead.findOneAndUpdate(
        { _id : id},
        { $set: { otp } },
        { new: true }
      );    

      const to = email;
      const subject = "Your OTP";
      const text = `Your OTP is: ${otp}`;

    await sendMail(to, subject, text);
      lead.history.push({
        createdby: "Client",
        timestamp: new Date(),
        changes: [
          {
            field: "Otp Generated",
            newValue: "OTP",
          },
        ],
      });

      res.status(200).json({ msg: "OTP sent successfully" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const { id, token } = req.params;
      const { JOtp } = req.body;
  
      // Check if the provided OTP is correct
      const lead = await Lead.findById(id)
  
      if (!lead) {
        return res.status(400).json({ msg: "Lead not found" });
      }
  
      const secret = JWT_SECRET + id;
      const verified = jwt.verify(token, secret);
  
      if (!verified) {
        return res.status(400).json({ msg: "Token expired" });
      }
  
      if (lead.otp === JOtp) {
        // OTP is correct, perform any actions you need here
        // For example, unset the OTP in the database
        await Lead.findByIdAndUpdate(id, { $unset: { otp: 1 } });
  
        // Log the history of OTP verification
        lead.otpverifieddate = new Date()
        lead.otpverified = true
        lead.history.push({
          createdby: "Client",
          timestamp: new Date(),
          changes: [
            {
              field: "Otp Verified",
              newValue: "OTP",
            },
          ],
        });
  
        // Save the lead with updated information
        await lead.save();
  
        return res.status(200).json({ msg: "OTP verified successfully" });
      } else {
        return res.status(400).json({ msg: "Invalid OTP" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  verifyTokenAndGetDetails : async (req, res) => {
    try {
      const { id, token } = req.params;
  
      const lead = await Lead.findById(id);
  
      if (!lead) {
        return res.status(404).json({ msg: "Lead not found" });
      }
  
      const secret = JWT_SECRET + id;
  
      try {
        const decodedToken = jwt.verify(token, secret);
  
        if (decodedToken) {
          // Token is valid, return the required details
          const response = {
            signature: lead.signature,
            otpverified:lead.otpverified
          };
  
          return res.status(200).json(response);
        }
      } catch (error) {
        return res.status(401).json({ msg: "Token expired or invalid" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }


};

module.exports = leadController;
