const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const userController = require("../controllers/user-controllers");

router.get("/valid/:tokenEmail", userController.updateValidEmail);

router.patch("/forgetpassword", userController.updateTokenPassword);
router.patch("/resetpassword/:tokenPassword", userController.reinitializePassword);

router.get("/match/:uid", userController.getMatchById);

router.get("/:uid/matched", userController.getMatchedByUid);

router.get("/:uid", userController.getUserById);

router.post("/signup", userController.createUser);
router.post("/login", userController.login);

router.patch("/:uid", userController.updateUser);
router.patch("/pwd/:uid", userController.updateUserPassword);
router.patch(
  "/picture/:uid",
  fileUpload.single("image"),
  userController.updateUserPicture
);
// router.patch('/:uid', userController.updateUser);

router.delete("/:uid", userController.deleteUser);

module.exports = router;