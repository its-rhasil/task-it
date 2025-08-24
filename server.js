const express = require("express");
const app = express()
const tasks = require("./routes/routes");
const error_handler = require("./middleware/error-handling");
const notFound = require("./middleware/notFound")
const connectDB = require("./database/connect")
require("dotenv").config()

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static("public"));
app.use("/api/v1/tasks", tasks);
app.get("/",(req,res)=>{
    res.send("<h1>Task-it API</h1>");
})
app.use(error_handler);
app.use(notFound);
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI).then(()=>console.log("Connected to database!"));
        app.listen(PORT,()=>console.log(`Server is running on the port ${PORT}`))
    } catch (error) {
        //App crashes if the connection fails!
        console.log("Connection Failed!");
        process.exit(1);
    }
};
// connectDB(process.env.MONGO_URI).then(()=>console.log("Connected to database")).catch(()=>console.log("Connection Failed!"));
// app.listen(PORT,()=>console.log(`Server is running on the port ${PORT}`))
start();