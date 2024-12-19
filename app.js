const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const { add } = require("./controller/chatController");
const mongoconnection = require("./config/mongoconnection.json");

// MongoDB Connection
mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

// Set up Express app
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes for user-related operations
const UserRouter = require("./routes/user");
app.use("/user", UserRouter);

// Create HTTP server
const server = http.createServer(app);

// Socket.IO Configuration
const io = require("socket.io")(server);

// Handle socket events
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("typing", (username) => {
    console.log(`${username} is typing...`);
    io.emit("typing", username);  // Emit to all users, including the sender
  });

  // Handle incoming messages
  socket.on("msg", (message) => {
    console.log("Received message:", message);
    add(message); // Add the message to the database (you need to define the add function in the controller)
    io.emit("msg", message); // Broadcast the message to all connected users
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
