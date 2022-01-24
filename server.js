const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { SourceMapDevToolPlugin } = require("webpack");
const io = new Server(server);

// middleware serves static content from media for all requests sent to media endpoint
app.use("/media", express.static(__dirname + "/src/media"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

app.get("/main.js", (req, res) => {
  res.sendFile(__dirname + "/dist/main.js");
});

app.get("/style.css", (req, res) => {
  res.sendFile(__dirname + "/src/style.css");
});

// UTILS

const returnRandomNumber = () => {
  return Math.floor(Math.random() * Math.floor(5)) + 1;
};

const returnRandomRarity = () => {
  // do this part
  const rarity = Math.floor(Math.random() * Math.floor(3)) + 1;

  if (rarity === 1) return "rare";
  if (rarity === 2) return "uncommon";
  if (rarity === 3) return "common";
  else {
    throw new Error("some shit with the cards rarity");
  }
};

const dealCards = () => {
  // creates a 5 lenght array with 1-5 random values

  // assemble object with rarity and number of card, return that instead of rarity and number separately

  return Array.from(Array(5)).map((card, i) => {
    return {
      id: returnRandomNumber(),
      rarity: returnRandomRarity(),
      description: `Some random number dynamic description ${returnRandomNumber()}`,
      stats: {
        attack: 0, // not used from here, native method of CardClass to randomize value of all stats, to be changed
        defense: 0,
        hp: 0,
      },
    };
  });
};

// SOCKET

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("chat", (msg) => {
    console.log(msg);
  });

  // Wrap this in IF statement, if id of the socketio client is the same as before, dont deliver new cards, keep the existing ones
  socket.emit("deal-cards", dealCards());
});

// SERVER NOTIFICATION

server.listen(3000, () => {
  console.log("listening on *:3000");
});