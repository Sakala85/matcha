const HttpError = require("../models/http-error");
const interestModel = require("../models/interest-model");
// const uuid = require("node-uuid");
// const userValidator = require("../utils/user-validator");

const createInterest = (req, res, next) => {
  const { interest } = req.body;
  userId = req.params.uid;
  //   const err = userValidator.userValidateAll(email, password, username);
  //   if (err) {
  //     return res.status(400).json({ message: err });
  //   }
  interestModel.instertInterest(interest, userId, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(201).json({ message: "Interest created" });
    }
  });
};

const getInterestById = (req, res, next) => {
  userId = req.params.uid;
  interestModel.getInterest(userId, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(201).json({ interest: data });
    }
  });
};

const deleteInterest = (req, res, next) => {
  const interestId = req.params.iid;
  interestModel.deleteInterestDB(interestId, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(201).json({ message: "Deleted Interest" });
    }
  });
};

exports.createInterest = createInterest;
exports.getInterestById = getInterestById;
exports.deleteInterest = deleteInterest;
