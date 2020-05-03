const express = require("express");
const router = express.Router();
const fileUpload = require("../middleware/file-upload");
const userController = require("../controllers/user-controllers");
const checkAuth = require("../middleware/check-auth");

router.get("/valid/:tokenEmail", userController.updateValidEmail);

router.patch("/forgetpassword", userController.updateTokenPassword);
router.patch("/resetpassword/:tokenPassword", userController.reinitializePassword);
router.post("/signup", userController.createUser);
router.post("/login", userController.login);

router.use(checkAuth); // a partir d'ici il y a besoin d'un token valide pour acceder aux routes suivantes.
router.get("/match/:uid", userController.getMatchById);

router.get("/:uid/matched", userController.getMatchedByUid);

router.get("/:uid", userController.getUserById);



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