const nodemailer = require("nodemailer");

async function sendMail(to, data) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PW,
    },
  });
  const info = await transporter.sendMail({
    from: "Đội ngũ bảo mật",
    to: to,
    subject: data.subject,
    html: data.content,
  });

  console.log("Message sent: %s", info.response);
}

module.exports = sendMail;
