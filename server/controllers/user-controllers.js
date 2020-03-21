const HttpError = require("../models/http-error");
const { insertUser } = require("../models/user");

let USER = [
  {
    key: "1",
    name: "Obama",
    bio: "Coucou moi c'est Obama President des Etats Unis :)",
    interest: ["politic", "music", "movies", "food"],
    gender: "Man",
    orientation: "Woman",
    age: "44",
    email: "obama@president.president",
    score: "33",
    online: "Online",
    id: "U1",
    coordinate: {
      lat: 40.7484405,
      lng: -73.9878584
    }
  },
  {
    key: "1",
    name: "JUJU",
    bio: "Coucou moi c'est Obama President des Etats Unis :)",
    interest: ["politic", "music", "movies", "food"],
    gender: "Man",
    orientation: "Woman",
    age: "44",
    email: "obama@president.president",
    score: "33",
    online: "Online",
    id: "U2",
    coordinate: {
      lat: 40.7484405,
      lng: -73.9878584
    }
  }
];

let LIKED = [
  {
    key: "1",
    name: "Obama",
    bio: "Coucou moi c'est Obama President des Etats Unis :)",
    interest: ["politic", "music", "movies", "food"],
    gender: "Man",
    orientation: "Woman",
    age: "44",
    email: "obama@president.president",
    score: "33",
    online: "Online",
    id: "U1",
    coordinates: {
      lat: 40.7484405,
      lng: -73.9878584
    }
  },
  {
    key: "2",
    name: "Julie",
    bio: "Coucou moi c'est Obama President des Etats Unis :)",
    interest: ["politic", "music", "movies", "food"],
    gender: "Man",
    orientation: "Woman",
    age: "44",
    email: "obama@president.president",
    score: "33",
    online: "Online",
    id: "U2",
    coordinates: {
      lat: 40.7484405,
      lng: -73.9878584
    }
  }
];

const getUserById = (req, res, next) => {
  const userId = req.params.uid;
  const user = USER.find(u => {
    return u.id === userId;
  });

  if (!user) {
    throw new HttpError("Could not find your profile !", 404);
  }
  res.json({ user });
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

const createUser = (req, res, next) => {
  if (insertUser(req, res, next) == true) {
    res.status(201).json({ message: "User created" });
  } else {
    throw new HttpError(
      "Pseudo or Email already Taken ! Verify if you already have an account ?",
      444
    );
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = USER.find(u => u.email === email);
  if (!identifiedUser || identifiedUser.password != password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong",
      401
    );
  }
  res.json({ message: "LoggedIn" });
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

exports.login = login;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getMatchByUid = getMatchByUid;
exports.getLikedByUid = getLikedByUid;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
