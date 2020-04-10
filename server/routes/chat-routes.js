const express = require("express");

const router = express.Router();

const chatController = require('../controllers/chat-controllers')
const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth); // a partir d'ici il y a besoin d'un token valide pour acceder aux routes suivantes.

router.get("/:room", chatController.getChatByRoom);
router.get("/", (req, res) => {
    res.send({ response: "Server is up and running." }).status(200);
  });


module.exports = router;
