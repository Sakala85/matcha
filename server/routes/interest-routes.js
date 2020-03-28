const express = require("express");
const router = express.Router();

const interestController = require('../controllers/interest-controllers')

router.get('/:uid', interestController.getInterestById);

router.post('/:uid', interestController.createInterest);

router.delete('/:iid', interestController.deleteInterest);

module.exports = router;
