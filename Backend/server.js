require('dotenv').config();
const express= require('express');
const getConnection = require('./database/db');
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoute = require("./routes/contactRoutes")
const cors = require("cors");
const errorMiddleware = require('./middlewares/error-middleware');
const serviceRoutes=require("./routes/serviceRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const emailRoutes = require("./routes/emailRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const userRoutes = require("./routes/userRoutes")


const app=express();

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Hello world");
});



app.use("/admin", adminRoutes);
app.use("/auth",authRoutes);
app.use("/form" ,contactRoute);
app.use("/services",serviceRoutes)
app.use("/bookings",bookingRoutes)
app.use("/reviews",reviewRoutes)
app.use("/email",emailRoutes)
app.use("/user",userRoutes)

app.use(errorMiddleware);

const port = 4000; 

getConnection();
app.listen(port, ()=> console.log(`Server is running on ${port}`));