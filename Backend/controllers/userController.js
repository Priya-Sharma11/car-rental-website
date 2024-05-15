const User = require("../models/User")
const Booking = require("../models/booking")
const bcrypt = require("bcrypt");

const userController = {
  getBookings:async(req,res)=>{
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const bookings = await Booking.find({ email: user.email });
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
},


getUserData: async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Exclude sensitive information like password before sending user data to the client
    const userData = {
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
      image: user.image
      // Add other fields you want to include in the userData
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

updateProfile : async(req,res)=>{
  const userId = req.params.id;
  const { name, email, phonenumber, image } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
// Update user data if provided
if (name) user.name = name;
if (email) user.email = email;
if (phonenumber) user.phonenumber = phonenumber;
if (image) user.image = image;

// Save the updated user
await user.save();
res.status(200).json({ message: "User details updated successfully", user });
} catch (error) {
  // Handle errors
  console.error('Error updating profile:', error);
  res.status(500).json({ error: 'Internal server error' });
}
},

updatePassword: async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify the current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    else{
    // If the current password is correct, update the password
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, saltRound);
    user.password = hashPassword;
    await user.save();
    }
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


}


module.exports= userController;