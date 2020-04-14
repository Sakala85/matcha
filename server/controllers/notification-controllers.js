const HttpError = require("../models/http-error");
const notificationModel = require("../models/notification-model");
const uuid = require('uuid/v4');
const {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
} = require("../utils/user-validator");

const getNotificationById = (req, res, next) => {
  const userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()])
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
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
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()])
  const validUserId2 = validate(id_user2, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid || !validUserId2) {
    return res.status(400).json({ message: validId.message || validUserId2.message});
  }
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
