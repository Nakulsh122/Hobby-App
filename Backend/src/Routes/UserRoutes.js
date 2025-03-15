const express = require('express')
const {GetAllUsers,UpdateUser,DeleteUser,GetUserById} = require('../Controllers/UserController')
const {AuthLogin , AuthRegister} = require('../Controllers/authcontroller')
const Router = express.Router()
const {validate,refreshJWTToken} = require('../Controllers/ValidationController')
// Login and Registering 
Router.post("/login",AuthLogin)
Router.post("/register",AuthRegister)
Router.post("/refresh",refreshJWTToken)

// user API's
Router.get("/", validate,GetAllUsers)
Router.get(":id",validate,GetUserById)
Router.delete("/:id",validate,DeleteUser)
Router.put("/:id",validate,UpdateUser)

module.exports =  Router