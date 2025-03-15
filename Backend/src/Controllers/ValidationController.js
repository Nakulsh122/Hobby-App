const jwt = require("jsonwebtoken");
require("dotenv").config();

const validate = (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  
  if (!AuthHeader || !AuthHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: true, message: "You are not Authorized" });
  }

  const token = AuthHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Token is Invalid" });
    }
    req.user = user;
    console.log("Decoded User:", user);
    next();
  });
};

const refreshJWTToken = async (req,res)=>{
    try{

        const {refreshToken} = req.body;
        if(!refreshToken) return res.status(401).json({error : true , message : "Token is not present"})
            jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({error : true , message : "The token is invalid"})
        }
        const newtoken = jwt.sign({
            id : user.id , 
            username : user.username
        },process.env.JWT_REFRESH_KEY,{expiresIn : process.env.JWT_EXPIRES_IN})
        
        return res.status(200).json({error : false , message : "New Token Successfully generated",newtoken})
    })
    } catch(error){
        res.status(500).json({error : true , message : error.message})
    }
}

module.exports = {
    validate,
    refreshJWTToken
};

