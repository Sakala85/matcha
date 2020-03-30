const HttpError = require("../models/http-error");
const notificationModel = require("../models/notification-model");
const uuid = require('uuid/v4');

const getNotificationById = (req, res, next) => {
  userId = req.params.uid;
  notificationModel.getNotification(userId, (err, result) => {
    if (!err) {
      return res.status(201).json({ notification: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

// const createNotif = (req, res, next) => {
//   const {
//     id,
//     type,
//     userName,
//     link,
//     date
//   } = req.body;
//   const createdNotif = {
//     id: uuid(),
//     type,
//     userName,
//     link,
//     date
//   };

//   NOTIF.push(createdNotif);

//   res.status(201).json(createdNotif);
// };


// exports.createNotif = createNotif;
exports.getNotificationById = getNotificationById;
