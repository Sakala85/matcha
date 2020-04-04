const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const notifController = require('../controllers/notification-controllers')

const checkAuth = require("../middleware/check-auth");


router.use(checkAuth); // a partir d'ici il y a besoin d'un token valide pour acceder aux routes suivantes.

// router.get('/', notifController.getNotification);
// router.post('/', notifController.createNotif);
router.get('/:uid', notifController.getNotificationById);
// router.post('/:uid', notifController.createNotif);

module.exports = router;
