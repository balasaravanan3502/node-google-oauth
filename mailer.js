const nodemailer = require("nodemailer");
const fs = require("fs");

const mailService = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email@gmail.com",
    pass: "BLA!BLA!",
  },
});

mailService.mailSender = async () => {
  try {
    //Reading the registered email
    var emails = JSON.parse(fs.readFileSync("users.json", "utf8")).emails;

    const mailOptions = {
      from: "email@gmail.com",
      to: emails,
      subject: "Hello",
      html: `<p>ClickHere<p>`,
    };
    transporter.sendMail(mailOptions, function (err, info) {
      if (!err) {
        return true;
      }
      console.log(err);
    });
  } catch (statusCd) {
    throw 400;
  }
};

module.exports = mailService;
