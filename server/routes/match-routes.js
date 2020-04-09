const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const matchController = require('../controllers/match-controllers')

const checkAuth = require("../middleware/check-auth");


router.use(checkAuth); // a partir d'ici il y a besoin d'un token valide pour acceder aux routes suivantes.

router.post('/dislike/:uid', matchController.dislike);
router.post('/like/:uid', matchController.like);

module.exports = router;
