const express = require('express')


const app = express()


// console.log("server is listenong");

app.use((req,res)=>{
    res.send("Hello from the server");
})


app.listen(3000)