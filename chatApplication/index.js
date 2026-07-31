const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const {Server} = require("socket.io");
const http = require("http");
const Messages = require("./models/Messages");
const User = require("./models/User");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
         origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
})

//app.use(cors());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Mongodb Connected"))
.catch((error) => console.log(error));

app.use("/auth", authRoutes);

//socket io login -- listens for a new client connection on a server
io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("send_message", async(data)=> {
        const {sender, receiver, message} = data;
        const newMessage = new Messages({sender, receiver, message});
        await newMessage.save();
        socket.broadcast.emit("receive_message", data);
    });

    // for receiving the message
    //for emitting the message to the receiver

    //user started typing
    socket.on("typing", (data) => {
        socket.broadcast.emit("user_typing", data);
    });

    //user stopped typing
    socket.on("stop_typing", () => {
        socket.broadcast.emit("user_stopped_typing");
    });
   
    socket.on("disconnect", () => {
         console.log("User disconnected", socket.id);
    });
});


//get all message from the user ... we need to make a list of all messages between the sender and receiver
app.get("/messages", async(req, res) => {
    const {sender, receiver} = req.query;
    try{
       const messages = await Messages.find({
           $or:[
            {sender, receiver}, 
            {sender: receiver, receiver: sender}
        ],
       }).sort({createdAt: 1}); 
       //sort by createdAt in ascending order oldest message first
       res.json(messages);
    }
    catch(error){
         res.status(500).json({message: "Error fetching messages"});
    }
});


//API for fetching all users
app.get("/users", async(req,res) => {
    const {currentUser} = req.query;
    try{
        const users = await User.find({username: {$ne: currentUser}});
        res.json(users);
    }
    catch(error){
        res.status(500).json({message:"Error fetching users"});
    }
})
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))