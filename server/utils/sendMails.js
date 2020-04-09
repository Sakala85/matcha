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

<<<<<<< HEAD
const sendEmailInscription = (email, token_email) => {
  var text =
    "Pour valider votre compte, merci de cliquer ici : http://localhost:3000/valid";
=======
const sendEmailInscription = (email, tokenEmail) => {
  
  const url = `http://localhost:3000/valid/${tokenEmail}`;
  
>>>>>>> 22718c39d23528d502f0fdfd6a53fcedde115a72
  var transporter = nodemailer.createTransport(smtpConfig);
  const mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Confirm email",
    html: `Please click on this link to confirm your email: <a href="${url}">${url}</a>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: " + info.response);
  });
};

const sendEmailResetPass = (email, tokenPassword) => {

  const url = `http://localhost:3000/resetpassword/${tokenPassword}`;
    "Pour reinitialiser votre mot de passe, clquez sur ce lien : ";

  transporter = nodemailer.createTransport(smtpConfig);
  mailOptions = {
    from: '"Matcha" <matcha42matcha42matcha42@gmail.com>',
    to: email,
    subject: "Réinitialisation du mot de passe",
    html: `Please click on this link to confirm your email: <a href="${url}">${url}</a>`,
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
