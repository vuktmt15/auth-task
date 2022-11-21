const sendMail = require("./sendMail");

async function sendOtpMail(to, otp) {
  let mailSubject = "Mã OTP của bạn";
  let mailContent = `<p>Kính chào anh/chị</p>
  
  <p>Mã OTP của anh/chị là %otp% có hiệu lực 30 phút từ thời điểm khởi tạo.</p>
  
  <p>Rất hân hạnh được phục vụ Quý khách hàng!</p>`;

  mailContent = mailContent.replace("%otp%", otp);

  await sendMail(to, {
    subject: mailSubject,
    content: mailContent,
  });
}

module.exports = sendOtpMail;
