const express=require('express');
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/auth-middleware") 
const router=express.Router();
const adminMiddleware = require("../middlewares/admin-middleware")



router.post("/addCars",authMiddleware, adminMiddleware,adminController.addCars);

router.get("/users",authMiddleware, adminMiddleware,adminController.getAllUsers)
router.get("/bookings",authMiddleware, adminMiddleware,adminController.getAllBookings)

router.get("/contacts",authMiddleware, adminMiddleware,adminController.getAllContacts);

router.delete("/delete/:id",authMiddleware, adminMiddleware,adminController.deleteUserById)

router.put("/updateCar/:id",authMiddleware,adminMiddleware,adminController.updateCar);
router.delete("/deleteCar/:id",authMiddleware,adminMiddleware,adminController.deleteCar);
router.get("/monthlybookings",authMiddleware,adminMiddleware,adminController.monthlyBooking);
router.get("/totalbookings",authMiddleware,adminMiddleware,adminController.totalBookings);
router.get("/totalcars",authMiddleware,adminMiddleware,adminController.totalCars);
router.get("/totalUsers",authMiddleware,adminMiddleware,adminController.totalUsers);
router.delete("/contacts/:id",authMiddleware,adminMiddleware,adminController.deleteContact);

module.exports=router;