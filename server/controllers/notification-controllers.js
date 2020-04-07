const HttpError = require("../models/http-error");
const notificationModel = require("../models/notification-model");
const uuid = require('uuid/v4');

const getNotificationById = (req, res, next) => {
  const userId = req.params.uid;
  notificationModel.getNotification(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ notification: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const createNotif = (req, res, next) => {
  const userId = req.params.uid;
  const {
    id_user2,
    type,
  } = req.body;
  notificationModel.createNotification(userId, id_user2, type, (err, result) => {
    if (!err) {
      return res.status(201).json({ notification: "Notification Sent" });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};


exports.createNotif = createNotif;
exports.getNotificationById = getNotificationById;
