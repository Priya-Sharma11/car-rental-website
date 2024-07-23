const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host:"smtp.gmail.com",
  port:465,
  secure:true,
  auth:{
  user: process.env.EMAIL_USERNAME, //sender gmail add
  pass: process.env.EMAIL_PASSWORD, //app pasword from gmail acc
  }
})

const mailOptions = {
  from:{
    name:'Priya',
    address: process.env.USER //sender add
  },
  to:["ps25283@gmail.com"], //list of receivers
  subject: "RideDetails",
  text:"Hello world",
  html:"<b>Hellooooo</b>",

}

const sendMail =async(transporter,mailOptions)=>{
  try {
    await  transporter.sendMail(mailOptions)
    console.log("email send successfully")
  } catch (error) {
    console.log(error)
  }
}
sendMail(transporter,mailOptions)