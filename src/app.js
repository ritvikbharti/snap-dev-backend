const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require("./models/user")
const Admin = require('./models/admin');

//  used for read the json data for incoming request from the body of postman
app.use(express.json());



app.post('/signup', async (req,res)=>{
    console.log(req.body);
    const user = new User(req.body)
    // creating a new instnace of user model
//     const user = new User({
//         firstName: "Sahil",
//         lastName : "Raj",
//         emailId :"sahil@gmail.com",
//         password:"sahil@123"

// });
    try{

        await user.save();
        res.send("User added successfully!")
    }catch(err){
        console.log(err);
        
    }
})

// get user from the email

app.get('/user',async (req,res)=>{
    const userEmail = req.body.emailId;    
    console.log(req.query.emailId)
    // console.log(userEmail);
    try{
        // const users = await User.find({emailId: userEmail});
        // console.log(user);
            const user = await User.findOne({emailId:userEmail});
            console.log(user);
            if(user) res.send(user);
            
            // if(users.length === 0) res.status(404).send("Something went wrong")
            // else res.send(user);
    }catch(err){
        res.send("Error occured");
    }

})


//  Feed-api to get the users from the database
app.get('/feed',async (req,res)=>{

})
// delete in database

app.delete('/user',async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);

        res.send("User deleted successfully");

    }catch(err){
        console.log("Some error occured");
        

    }

})

// Update in database

app.patch('/user',async (req,res)=>{
    const userId = req.body.userId
    const userData = req.body;
    console.log(userData);
    
    try{
        const user = await User.findByIdAndUpdate({_id: userId},userData,{returnDocument : "after",});
        console.log(user);
        

        res.send("User data updated successfully");

    }catch(err){
        res.status(400).send("Error occured");
    }
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