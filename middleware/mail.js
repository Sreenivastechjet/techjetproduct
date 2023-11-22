const nodemailer = require("nodemailer");

const sendMail = async (to, subject, content, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: `princecena300@gmail.com`,
      pass: process.env.PASS,
    },
  //   tls: {
  //     rejectUnauthorized: false
  // }
  });
  let info = await transporter.sendMail({
    from: `princecena300@gmail.com`,
    to: `${to}`,
    subject: `${subject}`,
    text: `${text}`,
    html: `<div> ${content} </div>`,
  });
  return info;
};

module.exports = sendMail;



