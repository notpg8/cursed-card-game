const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// middleware serves static content from media for all requests sent to media endpoint
app.use("/media", express.static(__dirname + "/media"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.js", (req, res) => {
  res.sendFile(__dirname + "/index.js");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/style.css");
});

// SOCKET

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat", (msg) => {
    console.log(msg);
  });

  // EXAMPLES OF MORE EVENTS HANDLING

  // socket.on("other event", (msg) => {
  //   console.log(msg);
  // });

  // socket.on("other other event", (msg) => {
  //   console.log(msg);
  // });

  // socket.on("other other other event", (msg) => {
  //   console.log(msg);
  // });
});

// SERVER NOTIFICATION

server.listen(3000, () => {
  console.log("listening on *:3000");
});
