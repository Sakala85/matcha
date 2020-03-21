const express = require("express");
const router = express.Router();

const userController = require('../controllers/user-controllers')


router.get('/:uid/match', userController.getMatchByUid);

router.get('/:uid/liked', userController.getLikedByUid);

router.post('/signup', userController.createUser);
router.post('/login', userController.checkUser);

router.patch('/:uid', userController.updateUser);

router.delete('/:uid', userController.deleteUser);

module.exports = router;
