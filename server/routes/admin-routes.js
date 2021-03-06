const express = require("express");

const router = express.Router();

const adminController = require('../controllers/admin-controllers')

router.get("/reported", adminController.getReported);

module.exports = router;