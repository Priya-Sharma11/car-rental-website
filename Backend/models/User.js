const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Booking = require("../models/booking")

const userSchema = new mongoose.Schema({

  name:{
    type : String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  phonenumber:{
    type:Number,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  image:{
    type:String,
    
  },
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
 /*  resetPasswordOTP: String,
  resetPasswordExpires: Date */
 
})


//secure the password with the bcrypt

userSchema.pre('save',async function(next){
  /* console.log("pre method",this); */
  const user=this;

  if(!user.isModified('password')){
    next();
  }
  try {
    const saltRound= await bcrypt.genSalt(10);
     const hash_password =  await bcrypt.hash(user.password,saltRound);
     user.password=hash_password;
     next();
  } catch (error) {
    next(error);
  }
})

userSchema.methods.comparePassword= async function(password){
  return  bcrypt.compare(password,this.password)
}
//jwt 
userSchema.methods.generateToken = async function(){
try {
  return jwt.sign({
    userId: this._id.toString(),
    email:this.email,
    isAdmin:this.isAdmin
  },
  process.env.JWT_SECRET_KEY,{
    expiresIn:"90d",
  }
  )
} catch (error) {
  console.log(error);
}

}


module.exports = mongoose.model("User",userSchema);