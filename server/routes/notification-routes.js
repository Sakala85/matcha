const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const notifController = require('../controllers/notification-controllers')

router.get('/:uid', notifController.getNotificationById);
// router.post('/:uid', notifController.createNotif);

module.exports = router;
