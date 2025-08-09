const validator = require("validator");

const valiDateSignUpData = (req)=>{
 const {firstName,lastName,emailId,password}  = req.body;
    if(!firstName || !lastName) throw new Error("Length is not valid");
    else if(firstName.length < 4 || firstName > 50) throw new Error("First Name should be in between 4 to 50 letters");
    else if(!validator.isEmail(emailId)) throw new Error("Email is not valid");
    else if(!validator.isStrongPassword(password)) throw new Error("Write some strong password")
    
}

module.exports = {valiDateSignUpData};