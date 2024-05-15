const { z } = require("zod");

const loginSchema = z.object({
  email: z
  .string({ required_error: "Email is required" })
  .trim()
  .email({ message: "Invalid email address" })
  .min(3, { message: "Email must be atleast of 3 chars" })
  .max(255, { message: "Name must not be more than 255 characters" }),


  password: z
  .string({ required_error: "Password is required" })
  .trim()
  .min(6, { message: "Password must be atleast of 6 chars" })
  .max(1024, { message: "Password must not be more than 1024 characters" }),
});


const signupSchema = loginSchema.extend({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be atleast of 3 chars" })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phonenumber: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(10, { message: "Phone must be atleast of 10 chars" })
    .max(20, { message: "Phone must not be more than 20 characters" }),


});



module.exports = { signupSchema, loginSchema };
