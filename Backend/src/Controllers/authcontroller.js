const bcrypt = require('bcryptjs')
const User = require('../DB/UserModal')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const AuthLogin =async (req,res)=>{
    try {
        const {username , password} = req.body 
        const user = await User.findOne({username});
        // console.log(user)
        if(!user){
            return res.status(404).json({error : true , message : "The user does not exist"})
        }
        const IsMatch = await bcrypt.compare(password , user.password);
        if(!IsMatch) return res.status(400).json({error : true , message : "Invalid Credentials"});
        const token = jwt.sign({
            id : user._id,
            username : user.username
        },process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN})
        const refreshtoken = jwt.sign({
            id : user._id,
            usernsmae : user.username
        },process.env.JWT_REFRESH_KEY , {expiresIn : "24h"})
        res.status(200).json({error : false , message : "User Logged In successfully" ,token,refreshtoken})
    } catch (error) {
        res.status(500).json({error : true , message : error.message})
    }
}

const AuthRegister =async (req,res) =>{
    try{
        const { username , email , password} = req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({error : true , message : "User Already Exist"})
        }
        const grain = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,grain);
        const NewUser = {
            username : username,
            email : email,
            password : hashedPassword,
            total_xp : 0,
            total_hobbies : 0,
            completed_hobbies : 0
        }
        User.create(NewUser)
        
        res.status(200).json({error : false , message : "User Created Successfully"})
    } catch(error){
        res.status(500).json({error : true , message : error.message})
    }
}

module.exports = {
    AuthLogin,
    AuthRegister
}