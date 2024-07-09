const nodeMailer = require("nodemailer");

const Mailservice = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service:process.env.SMPT_SERVICES,
    secure:true,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: options.sender,
    to: options.receiver,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = Mailservice;
