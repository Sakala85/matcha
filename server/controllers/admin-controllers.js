const adminModel = require("../models/admin-model");

const getReported = (req, res, next) => {
    adminModel.getAllReport((err, result) => {
    if (!err) {
      return res.status(201).json({ user: result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

exports.getReported = getReported;
