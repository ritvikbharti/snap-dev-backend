const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(400).send("Unauthorized Access");
    }else{
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(400).send("Unauthorized Access");
    }else{
        next();
    }
}

module.exports= {adminAuth,userAuth}