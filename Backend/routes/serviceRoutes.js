const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController")

router.get("/getAllCars", serviceController.getAllCars);

router.get("/getCarByCategory/:category",serviceController.getCarByCategory)

router.get("/getCarDetails/:carId",serviceController.getCarById);

router.get("/getCarBySorting", serviceController.getCarBySorting);

router.put('/toggleAvailability/:id', serviceController.toggleAvailability);

module.exports = router;