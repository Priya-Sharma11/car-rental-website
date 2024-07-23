const express = require('express');
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth-middleware")
const {signupSchema,loginSchema} = require("../validators/auth-validators")
const validate = require("../middlewares/validate-middleware")
const router = express.Router();

router.route("/register").post( validate(signupSchema),authController.register);
router.route("/login").post(validate(loginSchema),authController.login);
router.route("/user").get(authMiddleware,authController.user);
router.put('/updatePassword/:id', authMiddleware, authController.updatePassword);


module.exports = router;