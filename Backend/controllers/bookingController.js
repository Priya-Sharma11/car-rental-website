const booking = require("../models/booking")

const bookingController ={

  getAllBookings: async(req,res)=>{
    try {
      
      const newBooking={ 
      
      name:req.body.name,
      email :req.body.email,
      phoneNumber:req.body.phoneNumber, 
      pickupDate:req.body.pickupDate,
      pickupTime:req.body.pickupTime,
      source:req.body.source, 
      destination:req.body.destination, 
      persons:req.body.persons,
      message:req.body.message,
      carData: req.body.carData
    } 
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