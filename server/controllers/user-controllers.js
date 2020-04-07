const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");
const userValidator = require("../utils/user-validator");
const fs = require("fs");
const uuid = require("node-uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const token_email = uuid.v1();
  const err = userValidator.userValidateAll(
    email,
    password,
    username,
    firstname,
    lastname
  );
  if (err) {
    return res.status(400).json({ message: err });
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
  const { email, password } = req.body;
  userModel.getPassword(email, (err, user) => {
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
            { userId: user.id, email: user.email },
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
          message: "logged in",
        });
      }
    }
  });
};

const getUserById = (req, res, next) => {
  userId = req.params.uid;
  userModel.getUser(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ user: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const getMatchById = (req, res, next) => {
  userModel.getMatch(req.params.uid, (err, result) => {
    if (!err) {
      return res.status(201).json({ user: { result } });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const updateUser = (req, res, next) => {
  const { firstname, lastname, email, bio, gender, orientation } = req.body;
  const userId = req.params.uid;
  userModel.updateUser(
    firstname,
    lastname,
    email,
    bio,
    gender,
    orientation,
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

const deleteUser = (req, res, next) => {
  const userId = req.params.uid;
  if (!USER.find((u) => u.id !== userId)) {
    throw new HttpError("Could not delete your profile", 404);
  }
  USER = USER.filter((u) => u.id !== userId);
  res.status(200).json({ message: "Place Deleted" });
};

const getMatchByUid = (req, res, next) => {
  MATCH = "";
  user = "";
  if (!MATCH) {
    throw new HttpError("No matcheable people found !", 404);
  }
  if (!user) {
    throw new HttpError("Could not find your profile !", 404);
  }
  res.json({ match });
};

const getLikedByUid = (req, res, next) => {
  if (!LIKED) {
    throw new HttpError("No match Yet keep liking", 404);
  }
  res.json({ LIKED });
};

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getMatchById = getMatchById;
exports.getLikedByUid = getLikedByUid;
exports.updateUser = updateUser;
exports.updateUserPassword = updateUserPassword;
exports.updateUserPicture = updateUserPicture;
exports.deleteUser = deleteUser;
