const mongoose = require("mongoose")

// Cache the connection so it is reused across requests.
// On Vercel the app runs as a serverless function, and opening a new
// connection on every request would quickly exhaust the Atlas limit.
let connection = null;

//Connecting to the database
const connectDB = (url)=>{
    if(!connection){
        connection = mongoose.connect(url).catch((error)=>{
            connection = null; // allow a retry on the next request
            throw error;
        });
    }
    return connection;
}
module.exports = connectDB
