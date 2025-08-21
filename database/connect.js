const mongoose = require("mongoose")
//Connecting to the database
const connectDB = (url)=>{
    return mongoose.connect(url);
}
module.exports = connectDB
