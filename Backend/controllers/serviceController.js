const services = require("../models/services");

const serviceController = {
  getAllCars: async (req, res) => {
    try {
      const cars = await services.find();
      
      res.json(cars);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server error" });
    }
  },
  getCarBySorting:async (req,res)=>{
    try {
      const { sort } = req.query;
      let sortCriteria = {};

      if (sort === 'lowest') {
        sortCriteria = { Price: 1 }; // Sort by price in ascending order
      } else if (sort === 'highest') {
        sortCriteria = { Price: -1 }; // Sort by price in descending order
      }

      const sortedCars = await services.find().sort(sortCriteria);

      res.json(sortedCars);
    } catch (error) {
      console.error(error);
    res.status(500).json({ message: 'Internal server error' });
    }
  },

  getCarByCategory:async(req,res)=>{
    try {
      const { category } = req.params;
    const cars = await services.find({ category });
    res.json(cars);
    } catch (error) {
      console.error(error);
    res.status(500).json({ error: 'Server error' });
    }
  },
  getCarById:async(req,res)=>{
    const carId = req.params.carId;
    try {
      const car = await services.findById(carId);
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
      res.json(car);
      
    } catch (error) {
      console.error('Error fetching car details:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
  },
  toggleAvailability: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await services.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      service.available = !service.available;
      await service.save();
  
      const message = service.available ? 'Car available' : 'Car unavailable';
      res.status(200).json({ message, service });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
};

module.exports = serviceController;
