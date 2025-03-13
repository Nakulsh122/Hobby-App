const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("./DB/userModal")
const app = express();
app.use(express.json());
app.use(cors());

const { PORT, MONGO_URI } = process.env;

app.post(`/api/v1/test`, (req, res) => {
  console.log("Request Body:", req.body);
  res.json({ message: "Request Received", data: req.body });
});

app.post("/api/v1/user",async (req,res)=>{
  try {
    const NewUser = await User.create(req.body)
    res.status(200).json({error : false , data : NewUser})
  } catch (error) {
    res.status(500).json({message : error.message})
  }
})

app.get("/api/v1/all_users",async(req,res)=>{
  try {
    const Users = await User.find({});
    res.status(200).json({error : false , data : Users})
  } catch (error) {
    res.status(500).json({error: true , message : error.message})
  }
})

app.get("/api/v1/user/:id",async(req,res)=>{
  try{
  const {id} = req.params;
  const ResUser = await User.findById(id)
  res.status(200).json({error : false , data : ResUser})
  } catch (error){
    res.status(500).json({error : true , message : error.message})
  }
})
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
