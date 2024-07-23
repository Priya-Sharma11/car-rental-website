const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

const getConnection = async ()=>{
  try {
    await mongoose.connect(URI);
    console.log("Connected to mongodb successfully");
     
  } catch (error) {
    console.error("Database connection failed");
    process.exit(0);
  }
}

module.exports=getConnection;