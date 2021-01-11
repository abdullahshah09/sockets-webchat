const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const cors = require("cors");
require("dotenv").config();

app.use(
    cors({
    origin: ["https://webchat-socketio.netlify.app/"],
    method: ["GET", "POST", "DELETE"],
    credentials: true
 })
 );
const PORT = 7777;
io.on("connection", socket => {
    socket.emit("your id", socket.id);
    socket.on("send message", body => {
        io.emit("message", body)
    })
})


server.listen(process.env.PORT || PORT, () => console.log("server is running on port 7777"));