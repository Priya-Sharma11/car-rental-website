const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require('nodemailer');



const sendEmail = (req, res) => {
  const { carData, rideDetails, contactDetails, userEmail } = req.body;

  if (!carData || !rideDetails || !contactDetails ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(req.body);

  const adminMailOptions = {
    from: `"Booking Info from Brother's Travels" <${process.env.SMTP_MAIL}>`, // Display the company name in the from field
    replyTo: contactDetails.email, // User's email for the "reply-to" address
    to: 'ps25283@gmail.com', // Admin's email
    subject: 'New Booking Information',
    html: `
      <p><b>Car Details:</b></p>
      <p>Model: ${carData.Model}</p>
      <p>Transmission: ${carData.Transmission}</p>
      <p>Price: ${carData.Price}</p>
      <p>Fuel Type: ${carData.FuelType}</p>
      <p>Seating Capacity: ${carData.SeatingCapacity}</p>

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

  const userMailOptions = {
    from: `"Brother's Travels" <${process.env.SMTP_MAIL}>`,
    to: contactDetails.email,
    subject: 'Booking Confirmation - Brother\'s Travels',
    html: `
      <p>Dear ${contactDetails.name},</p>
      <p>Thank you for booking with Brother's Travels. We have received your booking information and will get back to you shortly with further details.</p>
      
      <p><b> Your Car Details</b></p>
      <p>Model: ${carData.Model}</p>
      <p>Price: ${carData.Price}</p>
      <p><b> Your Ride Details</b></p>
      <p>Pick Up Date: ${rideDetails.pickupDate}</p>
      <p>Pick Up Time: ${rideDetails.pickupTime}</p>
      <p>Source: ${rideDetails.source}</p>
      <p>Destination: ${rideDetails.destination}</p>
      <p>Persons: ${rideDetails.persons}</p>

      <p>Best Regards,<br/>Brother's Travels Team</p>
      `
  };


  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_MAIL, // Admin's email for SMTP authentication
      pass: process.env.SMTP_PASSWORD // SMTP password
    }
  });

  // Send mail to admin
  transporter.sendMail(adminMailOptions, (adminError, adminInfo) => {
    if (adminError) {
      console.log('Error occurred while sending email to admin:', adminError);
      res.status(500).json({ error: 'Error occurred while sending email to admin' });
    } else {
      console.log('Email sent to admin successfully:', adminInfo.response);
      // If email to admin is successful, send email to user
      transporter.sendMail(userMailOptions, (userError, userInfo) => {
        if (userError) {
          console.log('Error occurred while sending email to user:', userError);
          res.status(500).json({ error: 'Error occurred while sending email to user' });
        } else {
          console.log('Email sent to user successfully:', userInfo.response);
          res.status(200).json({ message: 'Emails sent successfully' });
        }
      });
    }
  });
};

module.exports = { sendEmail };
