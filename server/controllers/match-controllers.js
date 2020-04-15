const matchModel = require("../models/match-model");
const uuid = require("node-uuid");
const {
  validate,
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
} = require("../utils/user-validator");


const like = (req, res, next) => {
  const {liked} = req.body;
  const matcher = req.userData.userId;
  const room_id = uuid.v1();
  const validLiked = validate(liked, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  const validMatcher = validate(matcher, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validLiked.valid || !validMatcher.valid) {
    return res.status(400).json({ message: validLiked.message || validMatcher.message });
  }
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
  const validDisliked = validate(disliked, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  const validMatcher = validate(matcher, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validDisliked.valid || !validMatcher.valid) {
    return res.status(400).json({ message: validDisliked.message || validMatcher.message });
  }
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
  const validUnmatched = validate(unmatched, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  const validUnmatcher = validate(unmatcher, [VALIDATOR_REQUIRE(), VALIDATOR_NUMBER()]);
  if (!validUnmatched.valid || !validUnmatcher.valid) {
    return res.status(400).json({ message: validUnmatched.message || validUnmatcher.message });
  }
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