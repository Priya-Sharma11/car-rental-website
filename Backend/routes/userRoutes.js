const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")

router.get("/getBookings/:userId",userController.getBookings);
router.put("/updateProfile/:id",userController.updateProfile);
router.put("/updatePassword/:id",userController.updatePassword);
router.get("/userData/:userId", userController.getUserData);



module.exports = router;