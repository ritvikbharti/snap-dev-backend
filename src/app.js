const express = require('express')


const app = express()


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

const {adminAuth,userAuth} = require('./middlewares/auth')

app.use('/admin',adminAuth);

app.get('/admin/getAllData',(req,res)=>{
    
    res.send("All Data Sent");
    
})

app.get('/user',userAuth,(req,res)=>{
    res.send("user data sent");
})
app.delete('/admin/deleteData',(req,res)=>{
    res.send("All user Deleted");
})
app.get('/hello',(req,res)=>{
    res.send("Hello From Maa")
})

app.listen(7777)