const HttpError = require("../models/http-error");
const userModel = require("../models/user-model");
var uuid = require("node-uuid");

const createUser = (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;
  const token = uuid.v1();
  console.log(token);
  userModel.insertUser(
    username,
    firstname,
    lastname,
    email,
    password,
    token,
    (err, data) => {
      if (!err) {
        return res.status(201).json({ message: "User created" });
      } else {
        return res.status(400).json({ message: err });
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
  const { bio } = req.body;
  const userId = req.params.uid;

  const updatedUser = { ...USER.find(u => u.id === userId) };
  const userIndex = USER.findIndex(u => u.id === userId);
  updatedUser.bio = bio;

  res.status(200).json({ User });
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
exports.deleteUser = deleteUser;
