require("dotenv").config()
const path = require("path");
const express = require("express");
const app = express()
const tasks = require("./routes/routes");
const error_handler = require("./middleware/error-handling");
const notFound = require("./middleware/notFound")
const connectDB = require("./database/connect")

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static("public"));
// Make sure the database is connected before handling API requests.
// The connection is cached, so this only connects once per instance.
app.use("/api", async (req,res,next)=>{
    await connectDB(process.env.MONGO_URI);
    next();
});
app.use("/api/v1/tasks", tasks);
// On Vercel, "/" reaches this function instead of the static files,
// so serve the frontend explicitly (falling back to the CDN copy).
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"),(err)=>{
        if(err && !res.headersSent) res.redirect("/index.html");
    });
})
app.use(error_handler);
app.use(notFound);

// Local / long-running server: connect first, then listen.
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI).then(()=>console.log("Connected to database!"));
        app.listen(PORT,()=>console.log(`Server is running on the port ${PORT}`))
    } catch (error) {
        //App crashes if the connection fails!
        console.log(`Connection Failed!: ${error}`);
        process.exit(1);
    }
};

// `node server.js` / `npm start` runs the server directly.
// On Vercel the file is imported instead, and the exported app handles requests.
if(require.main === module){
    start();
}

module.exports = app;
