const jwt = require('jsonwebtoken')
const User = require('../models/user')

const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(400).send("Unauthorized Access");
    }else{
        next();
    }
}

const userAuth = async (req,res,next)=>{
  try{ 
    const {token} = req.cookies;
    if(!token) throw new Error("Invalid token")
   const decodedObj = await jwt.verify(token,"Snap-dev@88096");
   const {_id} = decodedObj
   const user = await User.findById(_id);
   if(!user) throw new Error("User not found");
    req.user = user;
   next();
    }catch(err){
        // console.log("Error-Occured: "+err.message);
        console.log(err.mesage);
        
        res.status(400).send("Error: "+ err.message);
        
   }
   

}

module.exports= {adminAuth,userAuth}