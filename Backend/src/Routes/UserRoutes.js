const express = require('express')
const {GetAllUsers,UpdateUser,DeleteUser,GetUserById} = require('../Controllers/UserController')
const {AuthLogin , AuthRegister} = require('../Controllers/authcontroller')
const Router = express.Router()

// Login and Registering 
Router.post("/login",AuthLogin)
Router.post("/register",AuthRegister)

Router.get("/",GetAllUsers)
Router.get(":id",GetUserById)
// Router.post("/",AddUser)
Router.delete("/:id",DeleteUser)
Router.put("/:id",UpdateUser)

module.exports =  Router