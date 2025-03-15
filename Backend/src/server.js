const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan')
// const jwt = require("jsonwebtoken");
const UserRoutes = require('./Routes/UserRoutes')
const HobbiesRoutes = require('./Routes/HobbiesRoutes')
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))
const { PORT, MONGO_URI } = process.env;

app.use("/api/v1/user",UserRoutes)
app.use("/api/v1/hobby",HobbiesRoutes)
app.post(`/api/v1/test`, (req, res) => {
  console.log("Request Body:", req.body);
  res.json({ message: "Request Received", data: req.body });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
