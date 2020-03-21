const express = require("express");

const router = express.Router();

const chatController = require('../controllers/chat-controllers')

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

router.get("/:room", chatController.getChatByRoom);

module.exports = router;