const mongoose = require('mongoose')
require('dotenv').config();

 const  ConnectDB = async () =>{
        await mongoose.connect(process.env.MONGO_URI).then(()=>{}).catch((error)=>{
            console.log(error)
        })
}

module.exports = ConnectDB;