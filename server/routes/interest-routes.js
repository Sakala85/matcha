const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const interestController = require("../controllers/interest-controllers");
router.use(checkAuth); // a partir d'ici il y a besoin d'un token valide pour acceder aux routes suivantes.

router.get("/:uid", interestController.getInterestById);
router.get("/popular/:uid", interestController.getPopularInterest);

router.get("/list/all", interestController.getInterestList);

router.post("/:uid", interestController.createInterest);

router.delete("/:iid", interestController.deleteInterest);

module.exports = router;
