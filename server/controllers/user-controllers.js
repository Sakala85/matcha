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

const createUser = async (req, res, next) => {
  let { username, firstname, lastname, email, password, lat, lon } = req.body;
  const token_email = uuid.v1();
  const userValidator = userValidateAll(
    email,
    password,
    username,
    firstname,
    lastname
  );
  if (!lat || !lon) {
    lat = 48.8865792;
    lon = 2.3363584;
  }
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
    lat,
    lon,
    (err, user) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        let token;
        try {
          token = jwt.sign(
            { userId: user[0].id, username: user[0].username },
            "motdepassesupersecret",
            { expiresIn: "1h" }
          );
        } catch (err) {
          throw new HttpError(
            "Logging in failed, please try again later.",
            400
          );
        }
        sendMail.sendEmailInscription(email, token_email);
        return res.json({
          userId: user[0].id,
          email: user[0].email,
          token: token,
          username: user[0].username,
          orientation: user[0].orientation,
          message: "logged in",
          valid_profil: user[0].valid_profil,
          valid_email: user[0].valid_email,
          gender: user[0].gender,
        });
      }
    }
  );
};

const login = (req, res, next) => {
  var { username, password, lat, lon } = req.body;

  const validUsername = validate(username, [
    VALIDATOR_REQUIRE(),
    VALIDATOR_ALPHANUMERIC(),
    VALIDATOR_MINLENGTH(2),
    VALIDATOR_MAXLENGTH(15),
  ]);
  const validPassword = validate(password, [
    VALIDATOR_REQUIRE(),
    VALIDATOR_PASSWORD(),
    VALIDATOR_MINLENGTH(6),
  ]);

  if (!lat || !lon) {
    lat = 48.8865792;
    lon = 2.3363584;
  }
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
        userModel.setLocation(lat, lon, user.id);
        return res.json({
          userId: user.id,
          email: user.email,
          token: token,
          username: user.username,
          orientation: user.orientation,
          message: "logged in",
          valid_profil: user.valid_profil,
          valid_email: user.valid_email,
          gender: user.gender,
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
  userModel.getMatch(
    req.params.uid,
    req.params.orientation,
    req.params.gender,
    (err, result) => {
      if (!err) {
        return res.status(201).json({ user: { result } });
      } else {
        return res.status(400).json({ message: err });
      }
    }
  );
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
  const validPassword = validate(newPassword, [
    VALIDATOR_REQUIRE(),
    VALIDATOR_PASSWORD(),
    VALIDATOR_MINLENGTH(6),
  ]);
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
  const validPassword = validate(newPassword, [
    VALIDATOR_REQUIRE(),
    VALIDATOR_PASSWORD(),
    VALIDATOR_MINLENGTH(6),
  ]);
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

const getProfileByUsername = (req, res, next) => {
  const { username } = req.params;
  const userId = req.userData.userId;
  userModel.getProfileExceptBlocked(username, userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ users: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const disconnect = (req, res, next) => {
  const { userId } = req.body;
  userModel.disconnectUser(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ users: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

exports.disconnect = disconnect;
exports.getProfileByUsername = getProfileByUsername;
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
