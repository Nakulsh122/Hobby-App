const express = require('express')
const {GetAllHobbies,AddHobby,UpdateHobby,DeleteHobby} = require('../Controllers/HobbyController')
const Router = express.Router()

Router.get("/:userId",GetAllHobbies);
Router.post("/",AddHobby);
Router.put("/:id",UpdateHobby);
Router.delete("/:id",DeleteHobby);

module.exports = Router