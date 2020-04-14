const matchModel = require("../models/match-model");
const uuid = require("node-uuid");

// const validator = require("../utils/user-validator")

const like = (req, res, next) => {
  const {liked} = req.body;
  const matcher = req.userData.userId;
  const room_id = uuid.v1();

  matchModel.addLike(matcher, liked, room_id, (err, result) => {
    if (!err) {
      return res.status(201).json({ result });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const dislike = (req, res, next) => {
  const {disliked} = req.body;
  const matcher = req.userData.userId;
  matchModel.addDislike(matcher, disliked, (err, result) => {
    if (!err) {
      return res.status(201).json({ message: "like sent" });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

const unmatch = (req, res, next) => {
  const { unmatched } = req.body;
  const unmatcher = req.params.uid;
  // if(validator.validatorIsId(unmatcher) ){
  //   console.log("tototootot")
  // }
  // console.log(req.params.uid)
  matchModel.deleteMatch(unmatcher, unmatched, (err, result) => {
    
    if (!err) {
      return res.status(201).json({ message: "user unmatched" });
    } else {
      return res.status(400).json({ message: err });
    }
  });

};

exports.dislike = dislike;
exports.like = like;
exports.unmatch = unmatch;