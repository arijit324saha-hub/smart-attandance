require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// 🔹 Initialize app
const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Create HTTP server
const server = http.createServer(app);

// 🔹 Setup Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// 🔹 Store io instance globally
app.set("io", io);

// 🔹 Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// 🔹 Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.log("❌ DB Error:", err));

// 🔹 Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/users", require("./routes/user"));
// 🔹 Test route
app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

// 🔹 Start server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});