const express = require('express')
const app = express()
const connectDB = require('./config/database')
const User = require("./models/user")
const Admin = require('./models/admin');
const bcrypt = require('bcrypt')
const {userAuth} = require('./middlewares/auth')
const {valiDateSignUpData} = require('./utils/validators')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


//  used for read the json data for incoming request from the body of postman
app.use(express.json());

// 
app.use(cookieParser());

app.post('/signup', async (req,res)=>{
    // console.log(req.body);
    
    
    const user = new User(req.body)
    // creating a new instnace of user model
//     const user = new User({
//         firstName: "Sahil",
//         lastName : "Raj",
//         emailId :"sahil@gmail.com",
//         password:"sahil@123"

// });
    try{
    //  -- > Validating the signup Data
        const {firstName,lastName,emailId,password,age }= req.body;
        const userEmail = req.body.emailId;
        valiDateSignUpData(req)

    //  --> Encrypt the password
        const find = await User.findOne({emailId : userEmail});
        if(find) res.send("User is already existed");
        else{

        
        const passwordHash = await bcrypt.hash(password,10)
        console.log(passwordHash);

        //  creating new instance of user model
            const user = new User({
                firstName,
                lastName,
                emailId,
                age,
                password : passwordHash,

            })
        
        await user.save();
        res.send("User added successfully!")
        }
    }catch(err){
        res.status(400).send("Error" + err.message);
        
    }
})


app.post('/login', async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const {age} = req.body;

        const user = await User.findOne({emailId:emailId});
        if(!user)  throw new Error("Invalid credentials");
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

            //  Create a JWT TOKEN
                // const token = await jwt.sign({_id:user._id},"Snap-dev@88096",{expiresIn : "1d"});
                const token = await user.getJWT();
                console.log(token);
                
            //  Add the token to cookie and send the response back to the user
            res.cookie('token',token);
            console.log(age);
            res.send("Login Successfull!!!");
        }else{
            throw new Error("Incorrect Passowrd");
        }

    }catch(err){
        res.status(400).send("Error: "+ err.message)
    }
})
// get user from the email

app.get('/profile',userAuth,async (req,res)=>{
    try{

   
        //  All things of authentication are managed by userAuth middleware
        const user = req.user;
    
        res.send(user);
    }catch(err){
        res.status(400).send("Error Occured: "+ err.message);
    }
    
})

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

app.post('/sendconnectionrequest',userAuth, async (req,res)=>{
    console.log("");
    const user = req.user;
    res.send(user.firstName + " send the Connection req!");
    
})
//  Feed-api to get the users from the database
app.get('/feed',async (req,res)=>{
        const user = new User({
        firstName: "Sahil",
        lastName : "Raj",
        emailId :"sahil@gmail.com",
        password:"sahil@123",
        age:13,

});

    try{
        await user.save();
        res.send(user);

    }catch(err){
        console.log("Error Occured",err);
        
    }
    
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

app.patch('/user/:userId',async (req,res)=>{
    const userId = req.params?.userId
    const userData = req.body;
    console.log(userData);
    
    try{
        const ALLOWED_UPDATES = ["photoUrl","about","gender","age","skills"];

        const isAllowed = Object.keys(userData).every((k)=>{
            ALLOWED_UPDATES.includes(k);
        });
        // if(!isAllowed) throw new Error("Update not allowed");
        const user = await User.findByIdAndUpdate({_id: userId},userData,{returnDocument : "after",runValidators: true});
        console.log(user);
        

        res.send("User data updated successfully");

    }catch(err){
        res.status(400).send("Error occured" +err.message);
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