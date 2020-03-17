const express = require("express");
const router = express.Router();
const user = require("../controllers/userController")

router.get("/", (req, res) => {
  res.send({ response: "Server is up and running." }).status(200);
  
});
router.use("/user", user);
//require(__dirname + "/controllers/userController")(router);


module.exports = router;