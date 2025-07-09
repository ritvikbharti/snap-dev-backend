const express = require('express')


const app = express()


// console.log("server is listenong");

// app.use('/',(req,res)=>{
//     res.send("Hello from the server");
// })
app.get('/user',(req,res,next)=>{
    console.log(req.query);
    // res.send({firstname: "Ritvik", lastname:"Bharti"});
    next();
},(req,res,next)=>{
    // res.send("2nd Respomse!");
    next();
},(req,res,next)=>{
    res.send("3rd Response!");
    
})

app.get('/hello',(req,res)=>{
    res.send("Hello From Maa")
})

app.listen(3000)