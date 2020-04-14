const matchModel = require("../models/match-model");
const uuid = require("node-uuid");


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

exports.dislike = dislike;
exports.like = like;
