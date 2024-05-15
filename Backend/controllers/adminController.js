
const Cars = require("../models/services");
const User = require("../models/User")
const Contact = require("../models/contact-model")



const adminController = {

  addCars: async (req, res) => {
    /* const {base64}=req.body; */
    try {
      // Create a new car object with file path and other details
      const newCar = {
        Model: req.body.Model,
        Transmission: req.body.Transmission,
        FuelType: req.body.FuelType,
        SeatingCapacity: req.body.SeatingCapacity,
        Price: req.body.Price,
        image: req.body.image,
        category:req.body.category
      };

      // Save the new car object to the database
      const createCars = await Cars.create(newCar);

      res.status(201).json({ 
      message: "Car added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  },
  getAllUsers : async (req,res) =>{
    try {
      const users = await User.find({},{password:0});
      if(!users || users.length === 0){
        return res.status(404).json({message:"No users Found"});
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error)
    }
  },

  getAllContacts : async(req,res)=>{
    try {
      const contacts = await Contact.find();
      if(!contacts || contacts.length === 0){
        res.status(404).json({message:"No Contact Found"});
      }
      res.status(200).json(contacts);
    } catch (error) {
      next(error)
    }
  },
  deleteUserById: async(req,res)=>{
    try {
      const id = req.params.id;
      await User.deleteOne({_id:id});
      return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
      next(error);
    }
  },
  updateCar: async (req, res) => {
    try {
      
      const carId = req.params.id;
      const carToUpdate = await Cars.findById(carId);
  
      if (!carToUpdate) {
        return res.status(404).json({ message: "Car not found" });
      }
  
      carToUpdate.Model = req.body.Model || carToUpdate.Model;
      carToUpdate.Transmission = req.body.Transmission || carToUpdate.Transmission;
      carToUpdate.FuelType = req.body.FuelType || carToUpdate.FuelType;
      carToUpdate.SeatingCapacity = req.body.SeatingCapacity || carToUpdate.SeatingCapacity;
      carToUpdate.Price = req.body.Price || carToUpdate.Price;
      carToUpdate.image = req.body.image || carToUpdate.image;
      carToUpdate.category = req.body.category || carToUpdate.category;

      await carToUpdate.save();

      res.status(200).json({ message: "Car details updated successfully", car: carToUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  
  deleteCar: async (req,res)=>{
    try{
      const carId = req.params.id;
      if (!carId) {
        return res.status(404).json({ message: "Car not found" });
      }
      await Cars.deleteOne({_id:carId});
      return res.status(200).json({message:"Car Deleted Successfully"})

    }catch(error){
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = adminController;
