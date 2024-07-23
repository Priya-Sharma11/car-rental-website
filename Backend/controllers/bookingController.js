const booking = require("../models/booking")

const bookingController ={

  getAllBookings: async(req,res)=>{
    try {
      
      const newBooking = {
        name: req.body.contactDetails.name,
        email: req.body.contactDetails.email,
        phoneNumber: req.body.contactDetails.phoneNumber,
        pickupDate: req.body.rideDetails.pickupDate,
        pickupTime: req.body.rideDetails.pickupTime,
        source: req.body.rideDetails.source,
        destination: req.body.rideDetails.destination,
        persons: req.body.rideDetails.persons,
        message: req.body.contactDetails.message,
        carData: req.body.carData,
      };
      const createBooking = await booking.create(newBooking);

      res.status(201).json({ 
      message: "Booking added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  }

}
module.exports = bookingController;