const express = require('express');
const router = express.Router();
const reviewController = require("../controllers/reviewController")

router.post("/newReview/:carId",reviewController.newReview);
router.get('/reviews/:carId',reviewController.getAllReview);
router.delete('/deleteReview/:id', reviewController.deleteReview);
router.delete('/deleteReviews/:id', reviewController.deleteReviews);
router.get('/averageRating/:carId',reviewController.averageRating);
router.get('/getAllReviews',reviewController.getAllReviews);
router.get('/getReview',reviewController.getReview);

module.exports = router;