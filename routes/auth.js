const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/").get(authController.users);

router.route('/login').post(authController.login);

router.route('/register').post(authController.register);
router.route('/isthere').get(authController.isusers);
router.route('/istoken').post(authController.istoken);
router.route('/addlist').patch(authController.addlist);
router.route('/deletepost').patch(authController.deletepost);

module.exports = router;