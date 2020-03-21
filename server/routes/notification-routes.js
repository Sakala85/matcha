const express = require("express");
const HttpError = require("../models/http-error");
const router = express.Router();
const notifController = require('../controllers/notification-controllers')

router.get('/', notifController.getNotification);
router.post('/', notifController.createNotif);

module.exports = router;
