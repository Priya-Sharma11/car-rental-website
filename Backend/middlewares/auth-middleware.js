const jwt = require("jsonwebtoken");
const User = require("../models/User")

const authMiddleware =async (req,res,next)=>{
  const token = req.header('Authorization');

  if(!token){
    return res.status(401).json({msg:"Unauthorised HTTP, Token not provided"});
  }
  console.log('token from auth middleware',token);

const jwtToken = token.replace("Bearer", "").trim();
console.log('token from auth middleware',jwtToken);

try {
  const isVerified = jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
  //console.log(isVerified);

  const userData =await User.findOne({email:isVerified.email}).select({
    password:0,
  })
  //console.log(userData);
  req.token=token;
  req.user = userData;
  req.userID=userData._id;
  
  next();
} catch (error) {
  return res.status(401).json({message:"Unauthorised. Invalid token"}); 
  
}

}

module.exports = authMiddleware;