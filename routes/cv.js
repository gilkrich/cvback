const express = require("express");
const cvtempController = require("../controllers/cvtempController");
const router = express.Router();


router.route('/create').post(cvtempController.createcv);
router.route('/getcv').post(cvtempController.findcv);
router.route('/patchcv').patch(cvtempController.patchcv);
router.route('/deletecv').patch(cvtempController.deletecv);
router.route('/deletecvtwo').patch(cvtempController.deletecv);


module.exports = router;