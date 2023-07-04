const jwt = require("jsonwebtoken")
require("dotenv").config()


const authentication =(req,res,next)=>{
    if(!req.headers.authentication){
        return res.send("please Login again")
    }
    const token =req.headers.authentication.split(" ")[1]
    jwt.verify(token,process.env.JWT_SECRET, function(err,decoded){
        if(err){
            res.send("Please Login")
        }
        else{
            req.body.userId=decoded.userId
        }
    })
}


module.exports={
    authentication
}
