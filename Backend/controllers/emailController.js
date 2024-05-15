const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');

const sendEmail = (req, res) => {
  const { carData, rideDetails, contactDetails,email } = req.body;
  
  const mailOptions = {
    from: email,
    to: 'ps25283@gmail.com', // Replace with your admin's email
    subject: 'New Booking Information',
    html: `
      <p><b>Car Details:</b></p>
      <p>Model: ${carData.Model}</p>
      <p>Transmission: ${carData.Transmission}</p>
      <p>Price: ${carData.Price}</p>
      <p>Fuel Type: ${carData.FuelType}</p>

      <p><b>Ride Details:</b></p>
      <p>Pick Up Date: ${rideDetails.pickupDate}</p>
      <p>Pick Up Time: ${rideDetails.pickupTime}</p>
      <p>Source: ${rideDetails.source}</p>
      <p>Destination: ${rideDetails.destination}</p>
      <p>Persons: ${rideDetails.persons}</p>

      <p><b>Contact Details:</b></p>
      <p>Name: ${contactDetails.name}</p>
      <p>Email: ${contactDetails.email}</p>
      <p>Phone Number: ${contactDetails.phoneNumber}</p>
      <p>Message: ${contactDetails.message}</p>
    `
  };

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: process.env.SMTP_PASSWORD
    }
  });

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred while sending email:', error);
      res.status(500).json({ error: 'Error occurred while sending email' });
    } else {
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });

};

module.exports = { sendEmail };

