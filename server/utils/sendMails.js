var nodemailer = require("nodemailer");
var smtpConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: "matcha42matcha42matcha42@gmail.com",
    pass: "Matcha42*42",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const sendEmailInscription = (email, tokenEmail) => {
  const url = `http://localhost:3000/valid/${tokenEmail}`;
  console.log("SDMNEWODNWEOROROR");

  var transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Confirmation email",
    html: `Please click on this link to confirm your email: <a href="${url}">${url}</a>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("EROROROROROR");
      return console.log(error);
    }

    console.log("Message sent: " + info.response);
  });
};

const sendEmailResetPass = (email, tokenPassword) => {
  const url = `http://localhost:3000/resetpassword/${tokenPassword}`;

  transporter = nodemailer.createTransport(smtpConfig);
  mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Reset your password on matcha website",
    html: `Please click on this link to reset your password: <a href="${url}">${url}</a>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

exports.sendEmailResetPass = sendEmailResetPass;
exports.sendEmailInscription = sendEmailInscription;
