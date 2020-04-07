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

const sendEmailInscription = (email) => {
  var text =
    "Pour valider votre compte, merci de cliquer ici : http://localhost:5000/valid/change_pass/";
  var transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Inscritpion Matcha",
    html: "<p>" + text + "</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

function sendEmailResetPass(email) {
  var text =
    "Pour reinitialiser votre mot de passe, clquez sur ce lien : http://localhost:5000/reset/change_pass/";

  transporter = nodemailer.createTransport(smtpConfig);
  mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Réinitialisation du mot de passe",
    text: text,
    html: "<p>" + text + "</p>",
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
}

exports.sendEmailResetPass = sendEmailResetPass;
exports.sendEmailInscription = sendEmailInscription;
