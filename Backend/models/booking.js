const {Schema,model} = require("mongoose");

const bookingSchema = new Schema({
  name:{
    type:String
  },
    email: {
      type:String
    },
    phoneNumber: {
      type:Number
    },
    pickupDate: {
      type: Date,

    },
    pickupTime: {
      type:String,
    },
    source: {
      type:String
    },
    destination: {
      type:String
    },
    persons: {
      type:Number
    },
    message: {
      type:String
    },
    carData: {
      // Define the structure of the carData field
      type: Schema.Types.Mixed, // Mixed type allows storing arbitrary data
    },
   /*  car: {
      type: Schema.Types.ObjectId,
      ref: 'Car' // Reference to the Car model
    } */
})

const Booking = new model('Booking', bookingSchema);
module.exports = Booking;