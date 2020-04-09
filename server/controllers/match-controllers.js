const matchModel = require("../models/match-model");

const like = (req, res, next) => {
  const {liked} = req.body;
  const matcher = req.userData.userId;
  matchModel.addLike(matcher, liked, (err, result) => {
    if (!err) {
      console.log(result)
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
