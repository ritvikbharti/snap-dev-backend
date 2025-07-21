const mongoose = require('mongoose')



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

    }


})


const User = mongoose.model("User",userSchema);


module.exports = User