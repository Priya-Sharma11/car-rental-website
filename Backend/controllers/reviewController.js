const Review = require("../models/reviewSchema");


const reviewController={
  newReview : async (req,res)=>{
    try {
      const { carId } = req.params;
      const { customer_name, image, rating, description } = req.body;

      // Create a new review instance
      const newReview = new Review({
          car_id: carId,
          image,
          customer_name,
          rating,
          description
      });

      // Save the review to the database
      await newReview.save();

      res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
  },
  getAllReview:async(req,res)=>{
    try{
      const carId = req.params.carId;
    const reviews = await Review.find({ car_id: carId });
    res.json(reviews);
    }catch(error){
      res.status(500).json({ error: err.message });

    }
  },
  averageRating:async(req,res)=>{
    try {
      const carId = req.params.carId;
      // Find all reviews for the specified car
      const reviews = await Review.find({ car_id: carId });
  
      if (reviews.length === 0) {
        return res.status(404).json({ error: 'No reviews found for this car' });
      }
  
      // Calculate the average rating
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;
  
      res.json({ averageRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  },
  deleteReview: async (req, res) => {
    const reviewId = req.params.id;
    console.log(`Received request to delete review with ID: ${reviewId}`);
    try {
      const result = await Review.findByIdAndDelete(reviewId);
      if (result) {
        console.log(`Review with ID: ${reviewId} deleted successfully`);
        res.status(200).json({ message: "Review deleted successfully" });
      } else {
        console.error(`Review with ID: ${reviewId} not found`);
        res.status(404).json({ error: "Review not found" });
      }
    } catch (error) {
      console.error(`Error deleting review with ID: ${reviewId}`, error);
      res.status(500).json({ error: "Error deleting review" });
    }
  },
  deleteReviews:async(req,res)=>{
    try {
      const { id } = req.params;
      await Review.findByIdAndDelete(id);
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllReviews:async(req,res)=>{
    try {
      const reviews = await Review.find();
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getReview: async (req, res) => {
    try {
      // Limit the number of reviews fetched to 2-3
      const reviews = await Review.find().limit(3); // Limit to 3 reviews
      res.status(200).json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = reviewController;