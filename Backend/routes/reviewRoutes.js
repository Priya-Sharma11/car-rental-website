const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController")

router.post("/newReview/:carId",reviewController.newReview);
router.get('/reviews/:carId',reviewController.getAllReview);

module.exports = router;