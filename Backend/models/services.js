const {Schema,model} = require("mongoose");

const serviceSchema = new Schema({
  Model:{
    type: String,
    required:true
  },
  Transmission:{
    type: String,
    required: true
  },
  FuelType:{
    type:String,
  },
  SeatingCapacity:{
    type: Number
  },
  Price:{
    type:Number
  },
  image:{
    type:String
  },
  category:{
    type:String
  },
  feature:{
    type:Boolean,
    default:false
  },
  review:{
    type:Number
  },
  available:{
    type:Boolean,
    default:true
  }
})

const Service = new model('Service', serviceSchema);
module.exports = Service;