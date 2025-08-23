const {customError} = require("../errors/error");
const error_handler = (err,req,res,next)=>{
    if(err instanceof customError){
        return res.status(err.statusCode).send(err.message);
    }
    if(err.name = "ValidationError"){
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({success : false, message: messages.join(",")});
    }
    return res.status(500).send("Something went wrong!");
}
module.exports = error_handler;