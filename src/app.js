const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require("./models/user")
const Admin = require('./models/admin');

app.post('/adminsignup',async(req,res)=>{
    const admin = new Admin({name:'Admin',password:'Admin@123'});
    await admin.save();
    res.status(201).json({message:'Admin created Successfully'});
})
app.post('/signup', async (req,res)=>{

    // creating a new instnace of user model
    const user = new User({
        firstName: "Tamma",
        lastName : "scs",
        emailId :"bhartiritvik1000@gmail.com",
        password:"Ritvik@123"

});
    await user.save();
    res.send("User added successfully!")
})


connectDB().then(()=>{
    console.log("Database connected Sucessfully!");
    app.listen(7777,()=>{
        console.log("Server running on port 7777");
        
    })
}).catch(err=>{
    console.log(err)
    console.error("Database does not connected")
})





// console.log("server is listenong");

// app.use('/',(req,res)=>{
//     res.send("Hello from the server");
// })
// app.get('/user',(req,res,next)=>{
//     console.log(req.query);
//     // res.send({firstname: "Ritvik", lastname:"Bharti"});
//     next();
// },(req,res,next)=>{
//     // res.send("2nd Respomse!");
//     next();
// },(req,res,next)=>{
//     res.send("3rd Response!");
    
// })

// const {adminAuth,userAuth} = require('./middlewares/auth')

// app.use('/admin',adminAuth);

// app.get('/admin/getAllData',(req,res)=>{
    
//     res.send("All Data Sent");
    
// })


// app.get('/',(err,req,res,next)=>{
//     if(err) res.status(500).send("error occured");
//     else res.send()
// })
// app.get('/getUSerData',(req,res)=>{
//     try{
//         throw new Error("ascdcc");
//         res.send("Data sent Successfully");
//     }catch(err){
//         res.status(500).send("Some error occured Contact support");
//     }
// })
// app.get('/user',userAuth,(req,res)=>{
//     res.send("user data sent");
// })
// app.delete('/admin/deleteData',(req,res)=>{
//     res.send("All user Deleted");
// })
// app.get('/hello',(req,res)=>{
//     res.send("Hello From Maa")
// })