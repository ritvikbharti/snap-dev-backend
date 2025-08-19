const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required:true,
        minLength: 4,
        maxLength: 100,
    },
    lastName:{
        type: String,
    },
    emailId:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        trim: true,
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type: String,
        required:true,
        min:18,
    },
    gender:{
        type: String,
        validate(value){
            if(!["male","female","others"].includes(value)) throw new Error("Gender data is not valid");
        }
    },
    photoUrl:{
        type: String,
        default:"https://www.shutterstock.com/image-vector/simple-gray-avatar-icons-representing-male-2582814323",

    },
    about:{
        type: String,
        default: "This is the default about of the user",
    },
    skills:{
        type:[String],

    },
   


},{timestamps:true})

// New way to create jwt token
userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id},"Snap-dev@88096",{expiresIn : "1d"});
    return token;

}

userSchema.methods.validatePassword = async function(passwordInput){
    const user = this;

    const isPaswordValid = bcrypt.compare(passwordInput,this.password);
    return isPaswordValid;

}
const User = mongoose.model("User",userSchema);


module.exports = User