const HttpError = require("../models/http-error");
const interestModel = require("../models/interest-model");
// const uuid = require("node-uuid");
const {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
  VALIDATOR_MINLENGTH,
} = require("../utils/user-validator");

const createInterest = (req, res, next) => {
  const { interest } = req.body;
  userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()])
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  const validInterest = validate(interest, [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]);
  if (!validInterest.valid) {
    return res.status(400).json({ message: validInterest.message });
  }
  if(interest === "All"){
    return res.status(400).json({ message: "All is not a Valid Interest" });
  }
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
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  interestModel.getInterest(userId, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(201).json({ interest: data });
    }
  });
};

const getPopularInterest = (req, res, next) => {
  userId = req.params.uid;
  const validId = validate(userId, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validId.valid) {
    return res.status(400).json({ message: validId.message });
  }
  interestModel.getPopularInterest(userId, (err, data) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      return res.status(201).json({ interest: data });
    }
  });
};

const getInterestList = (req, res, next) => {
  interestModel.getInterestList((err, data) => {
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
exports.getPopularInterest = getPopularInterest;
exports.getInterestList = getInterestList;
exports.createInterest = createInterest;
exports.getInterestById = getInterestById;
exports.deleteInterest = deleteInterest;
