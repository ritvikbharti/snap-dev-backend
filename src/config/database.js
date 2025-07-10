const mongoose = require('mongoose')




const url = "mongodb+srv://ritvikbharti_01:Ritvik%40123@cluster0.djocmo5.mongodb.net/SnapDev"
const connectDB = async()=>{
    await mongoose.connect(url);
}

module.exports = connectDB;




