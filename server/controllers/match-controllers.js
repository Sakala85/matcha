const matchModel = require("../models/match-model");

const like = (req, res, next) => {
  const {liked} = req.body;
  const matcher = req.userData.userId;
  matchModel.addLike(matcher, liked, (err, result) => {
    if (!err) {
      return res.status(201).json({ message: "like sent" });
    } else {
      return res.status(400).json({ message: err });
    }
  });
};

exports.like = like;
