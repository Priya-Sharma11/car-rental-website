const User = require("../models/User");
const Booking = require("../models/booking");
const bcrypt = require("bcrypt");

const userController = {
  getBookings: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const bookings = await Booking.find({ email: user.email });
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserData: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      // Exclude sensitive information like password before sending user data to the client
      const userData = {
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
        image: user.image,
        // Add other fields you want to include in the userData
      };
      res.status(200).json(userData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const userId = req.params.id;
      const userToUpdate = await User.findById(userId);

      if (!userToUpdate) {
        return res.status(404).json({ message: "User not found" });
      }

      userToUpdate.name = req.body.name || userToUpdate.name;
      userToUpdate.email = req.body.email || userToUpdate.email;
      userToUpdate.phonenumber =
        req.body.phonenumber || userToUpdate.phonenumber;

      if (req.body.image) {
        userToUpdate.image = req.body.image || userToUpdate.image;
      }

      await userToUpdate.save();

      res
        .status(200)
        .json({
          message: "User details updated successfully",
          user: userToUpdate,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  updatePassword: async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    try {
      // Find the user by ID
      const user = await User.findById(userId);

      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Verify the current password
      const isPasswordCorrect = await user.comparePassword(currentPassword);

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: "Current password is incorrect" });
      }

      // Hash the new password
      const saltRounds = 10; // bcrypt recommends 10 rounds for security
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password
      user.password = hashedPassword;

      // Save the updated user
      await user.save();

      // Respond with success message
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = userController;
