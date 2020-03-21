const HttpError = require("../models/http-error");
const uuid = require('uuid/v4');
const NOTIF = [
  {
    id: "1",
    type: "Like",
    userName: "Julie",
    date: "12/03/20",
    link: "/match"
  },
  {
    id: "2",
    type: "Chat",
    userName: "Julie",
    link: "/chat?name=moi&room=Julie",
    date: "12/03/20"
  },
  {
    id: "3",
    type: "Chat",
    userName: "Obama",
    link: "/chat?name=moi&room=Obama",
    date: "12/03/20"
  },
  {
    id: "4",
    type: "Chat",
    userName: "Obama",
    link: "/chat?name=moi&room=Obama",
    date: "12/03/20"
  }
];

const getNotification = (req, res, next) => {
  if (!NOTIF) {
    throw new HttpError("Could not find your profile !", 404);
  }
  res.json({ NOTIF });
};

const createNotif = (req, res, next) => {
  const {
    id,
    type,
    userName,
    link,
    date
  } = req.body;
  const createdNotif = {
    id: uuid(),
    type,
    userName,
    link,
    date
  };

  NOTIF.push(createdNotif);

  res.status(201).json(createdNotif);
};


exports.createNotif = createNotif;
exports.getNotification = getNotification;
