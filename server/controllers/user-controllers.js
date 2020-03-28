const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");
const uuid = require("node-uuid");
const userValidator = require("../utils/user-validator");
const fs = require("fs");

const createUser = (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const token = uuid.v1();
  const err = userValidator.userValidateAll(email, password, username);
  if (err) {
    return res.status(400).json({ message: err });
  }
  userModel.insertUser(
    username,
    firstname,
    lastname,
    email,
    password,
    token,
    (err, data) => {
      if (err) {
        return res.status(400).json({ message: err });
      } else {
        return res.status(201).json({ message: "User created" });
      }
    }
  );
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  userModel.isUser(email, password, (err, data) => {
    if (!err) {
      return res.status(201).json({ message: "User Found" });
    } else {
      return res.status(400).json({ message: err });
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
  userModel.getMatch(1, (err, result) => {
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
  if (!USER.find(u => u.id !== userId)) {
    throw new HttpError("Could not delete your profile", 404);
  }
  USER = USER.filter(u => u.id !== userId);
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
