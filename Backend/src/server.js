const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())


const {PORT} = process.env;
app.listen(PORT,()=>{
    console.log(`Server Running Successfully at port : ${PORT}`)
})