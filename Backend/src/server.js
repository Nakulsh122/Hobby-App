const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
const { PORT, MONGO_URI } = process.env;
console.log(PORT);
require("dotenv").config();

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running Successfully at port : ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.use("/api/v1/auth",authcontroller)
