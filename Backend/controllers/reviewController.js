const review = require("../models/reviewSchema");

const reviewController={
  newReview : async (req,res)=>{
    try {
      const { carId } = req.params;
      const { customer_name, rating, description } = req.body;

      // Create a new review instance
      const newReview = new review({
          car_id: carId,
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
    const reviews = await review.find({ car_id: carId });
    res.json(reviews);
    }catch(error){
      res.status(500).json({ error: err.message });

    }
  }
}

module.exports = reviewController;