const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");
const {
  userValidateAll,
  updateUserValidate,
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_ALPHANUMERIC,
  VALIDATOR_PASSWORD,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
} = require("../utils/user-validator");
const fs = require("fs");
const uuid = require("node-uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMails");
// const decodeUriComponent = require('decode-uri-component');

const createUser = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const token_email = uuid.v1();
  const userValidator = userValidateAll(
    email,
    password,
    username,
    firstname,
    lastname
  );
  if (!userValidator.valid) {
    return res.status(400).json({ message: userValidator.message });
  }
  let hachedpassword;
  try {
    hachedpassword = bcrypt.hashSync(password, 8);
  } catch (err) {
    const error = new HttpError("Could not create User, please try again", 500);
    return next(error);
  }
  userModel.insertUser(
    username,
    firstname,
    lastname,
    email,
    hachedpassword,
    token_email,
    (err, data) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        let token;
        try {
          //Le token est accepte par le server comme l'identite de l'utilisateur, c'est un mecanisme de securite en plus.
          //On va ainsi proteger certaines routes avec un acces prive, qui seront accessible seulement si la requete a un token valide
          //On impose un temps d'expiration car si jamais le token est subtilise par un hacker cela ne sera que pour un temps limite.
          token = jwt.sign(
            { userId: data.id, email: data.email },
            "motdepassesupersecret",
            
            { expiresIn: "1h" }
          );
          // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjU2LCJ1c2VybmFtZSI6ImFraG91Y2hhIiwiaWF0IjoxNTg4NjkwNDA5fQ.u6RzQ6q5kqWKSfDVNKX7Ne2Fu5GuX45tenzlhEEweUs
          sendMail.sendEmailInscription(email, token_email);
        } catch (err) {
          const error = new HttpError(
            "Could not create User, please try again",
            500
          );
          return next(error);
        }
        return res.status(201).json({
          userId: data.id,
          email: data.email,
          token: token,
          message: "User created",
        });
      }
    }
  );
};

const login = (req, res, next) => {
  const { username, password } = req.body;
  const validUsername = validate(username, [VALIDATOR_REQUIRE(), VALIDATOR_ALPHANUMERIC(), VALIDATOR_MINLENGTH(2), VALIDATOR_MAXLENGTH(15)]);
  const validPassword = validate(password, [VALIDATOR_REQUIRE(),VALIDATOR_PASSWORD(), VALIDATOR_MINLENGTH(6)]);
  if (!validUsername.valid || !validPassword.valid) {
    return res
      .status(400)
      .json({ message: validUsername.message || validPassword.message });
  }
  userModel.getPassword(username, (err, user) => {
    if (!user) {
      res.status(400).json({ message: "No user FOUND." });
    } else {
      let isValid = bcrypt.compareSync(password, user.password);
      if (isValid === false) {
        return res.status(401).json({ message: "Invalid Password." });
      } else {
        let token;
        try {
          token = jwt.sign(
            { userId: user.id, username: user.username },
            "motdepassesupersecret",
            { expiresIn: "1h" }
          );
        } catch (err) {
          throw new HttpError(
            "Logging in failed, please try again later.",
            400
          );
        }
        return res.json({
          userId: user.id,
          email: user.email,
          token: token,
          username: user.username,
          orientation: user.orientation,
          message: "logged in",
        });
      }
    }
  });
};

const getUserById = (req, res, next) => {
  userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  userModel.getUser(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ user: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const getMatchById = (req, res, next) => {
  userModel.getMatch(req.params.uid, req.params.orientation, (err, result) => {
    if (!err) {
      return res.status(201).json({ user: { result } });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const updateUser = (req, res, next) => {
  const {
    username,
    firstname,
    lastname,
    email,
    bio,
    gender,
    orientation,
    age,
  } = req.body;
  const userId = req.params.uid;
  const updateUserValidator = updateUserValidate(
    username,
    firstname,
    lastname,
    email,
    bio,
    gender,
    orientation,
    age,
    userId
  );
  if (!updateUserValidator.valid) {
    return res.status(400).json({ message: updateUserValidator.message });
  }
  userModel.updateUser(
    username,
    firstname,
    lastname,
    email,
    bio,
    gender,
    orientation,
    age,
    userId,

    (err, data) => {
      if (!err) {
        return res.status(201).json({ message: "User Updated" });
      } else {
        return res.status(400).json({ message: err });
      }
    }
  );
};

const updateUserPassword = (req, res, next) => {
  const { oldPassword, newPassword, repeatPassword } = req.body;
  const userId = req.params.uid;
  const validPassword = validate(newPassword, [VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD(), VALIDATOR_MINLENGTH(6)]);
  if (!validPassword.valid) {
    return res.status(400).json({ message: validPassword.message });
  } else if (oldPassword === newPassword) {
    return res.status(400).json({
      message: "Your new password must be different from your old password",
    });
  } else if (newPassword !== repeatPassword) {
    return res.status(400).json({ message: "Please repeat the same password" });
  } else {
    userModel.updateUserPassword(
      oldPassword,
      newPassword,
      repeatPassword,
      userId,
      (err, data) => {
        if (!err) {
          return res.status(201).json({ message: "User Updated" });
        } else {
          return res.status(400).json({ message: err });
        }
      }
    );
  }
};

const updateUserPicture = (req, res, next) => {
  const { picture } = req.body;
  let fileUrl = "http://localhost:5000/" + req.file.path.replace(/\\/g, "/");
  // if (req.file) {
  //   fs.unlink(req.file.path, (err) => {
  //     console.log(err);
  //   })
  // }
  const userId = req.params.uid;

  userModel.updateUserPicture(picture, fileUrl, userId, (err, data) => {
    if (!err) {
      return res.status(201).json({ message: "User Updated" });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const getMatchedByUid = (req, res, next) => {
  const userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  userModel.getUserMatch(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ matched: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  if (!USER.find((u) => u.id !== userId)) {
    throw new HttpError("Could not delete your profile", 404);
  }
  USER = USER.filter((u) => u.id !== userId);
  res.status(200).json({ message: "Place Deleted" });
};

const updateValidEmail = (req, res, next) => {
  const { tokenEmail } = req.params;
  userModel.updateValidEmail(tokenEmail, (err, result) => {
    if (!err) {
      return res.status(200).json({ user: result[0] });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const updateTokenPassword = (req, res, next) => {
  const { email } = req.body;
  const token_password = uuid.v1();
  userModel.updateTokenPassword(email, token_password, (err, result) => {
    if (!err) {
      sendMail.sendEmailResetPass(email, token_password);
      return res.status(200).json({ message: "User received email" });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const reinitializePassword = (req, res, next) => {
  const { newPassword, repeatPassword } = req.body;
  const { tokenPassword } = req.params;
  const validPassword = validate(newPassword, [VALIDATOR_REQUIRE(), VALIDATOR_PASSWORD(), VALIDATOR_MINLENGTH(6)]);
  if (!validPassword.valid) {
    return res.status(400).json({ message: validPassword.message });
  }
  if (newPassword !== repeatPassword) {
    return res.status(400).json({ message: "Please repeat the same password" });
  }
  userModel.reinitializePassword(
    tokenPassword,
    newPassword,
    repeatPassword,
    (err, data) => {
      if (!err) {
        return res.status(201).json({ message: "User Updated" });
      } else {
        return res.status(400).json({ message: err });
      }
    }
  );
};

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getMatchById = getMatchById;
exports.getMatchedByUid = getMatchedByUid;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.updateUserPicture = updateUserPicture;
exports.deleteUser = deleteUser;
exports.updateValidEmail = updateValidEmail;
exports.updateTokenPassword = updateTokenPassword;
exports.reinitializePassword = reinitializePassword;