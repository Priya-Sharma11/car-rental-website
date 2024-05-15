const User = require("../models/User");

const authController = {
  register: async (req, res, next) => {
    try {
      const { name, email, phonenumber, password } = req.body;

      const emailExist = await User.findOne({ email });
      const phonenumberExist = await User.findOne({ phonenumber });

      if (emailExist || phonenumberExist) {
        return res.status(400).json({ message: "User already exist" });
      }

      const userCreated = await User.create({
        ...req.body,
        password: password /* hash_password */,
      });

      //jsonwebtoken assign
      /*  const token = jwt.sign({ _id: userCreated._id},'secretkey123',{
        expiresIn:'90d',
      }) */
      res.status(201).json({
        status: "success",
        message: "Registration successfull",
        token: await userCreated.generateToken(),
        user: {
          _id: userCreated._id.toString(),
          name: userCreated.name,
          email: userCreated.email,
        },
      });
    } catch (error) {
      /*  console.log(error);
      res.status(500).json({msg:"Internal server error"}); */
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user)
        return res.status(400).json({ message: "Invalid Credentials" });

      /*  const isPasswordValid = await bcrypt.compare(password,user.password); */
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        res.status(401).json({ msg: "Invalid email or password" });
      } else {
        res.status(201).json({
          status: "success",
          token: await user.generateToken(),
          msg: "Login Successfully",
          user: {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
          },
        });
      }
    } catch (error) {
      console.error(error);
      /*  res.status(500).json({ message: "Internal server error" }); */
      next(error);
    }
  },
  //to send user data -user logic

  user: async (req, res) => {
    try {
      const userData = req.user;
      console.log(userData);
      res.status(200).json({ userData });
    } catch (error) {
      console.log(`error from the user route ${error}`);
    }
  },
};
module.exports = authController;
