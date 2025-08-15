const mongoose = require('mongoose')
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log(uri);
console.log("🧪 Loaded URI from .env:", uri || "undefined");
const connectDB = async()=>{
    await mongoose.connect(uri);
}


module.exports = connectDB;




