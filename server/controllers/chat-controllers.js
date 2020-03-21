const HttpError = require("../models/http-error");

const MESSAGE = [
  {
    id: "1",
    sender: "Obama",
    roomID: "R1",
    IdUser: "U2",
    Message: "Coucou moi c'est Obama President des Etats Unis :)",
    date: "12-03-18"
  },
  {
    id: "2",
    sender: "Obama",
    roomID: "R1",
    IdUser: "U2",
    Message: "Coucou moi c'est Obama President des Etats Unis :)",
    date: "12-03-18"
  },
  {
    id: "3",
    sender: "Obama",
    roomID: "R1",
    IdUser: "U2",
    Message: "Coucou moi c'est Obama President des Etats Unis :)",
    date: "12-03-18"
  },
  {
    id: "4",
    sender: "me",
    roomID: "R1",
    IdUser: "U2",
    Message: "Coucou moi c'est JUUJUJUUUU",
    date: "12-03-18"
  },
  {
    id: "5",
    sender: "Obama",
    roomID: "R2",
    IdUser: "U2",
    Message: "Coucou moi c'est Obama President des Etats Unis :)",
    date: "12-03-18"
  }
];

const getChatByRoom = (req, res, next) => {
  const roomId = req.params.room;
  const message = MESSAGE.filter(r => {
    if (r.roomID === roomId) {
      return r;
    }
  });

  if (!message) {
    throw new HttpError("No message yet, make the first moove", 404);
  }
  res.json({ message });
};

exports.getChatByRoom = getChatByRoom;
