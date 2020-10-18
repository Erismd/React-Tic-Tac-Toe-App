const express = require("express");
// const { Session } = require("inspector");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const path = require("path");

const Session = require("./SessionObj").Session;

let codeToSession = {};
let SocketToSession = {};

function socketEvens(socket) {
  //create session : player1
  socket.on("create-session", (name) => {
    console.log("!!!!!!!!!!");
    let code = Math.floor(Math.random() * 1000000).toString();
    const session = new Session(name, socket, code);

    codeToSession = {
      ...codeToSession,
      [code]: session,
    };

    SocketToSession = {
      ...SocketToSession,
      [code]: session,
    };

    socket.emit("session-created", name, code);
    socket.on("disconnect", () => {
      try {
        SocketToSession[socket].player_two_socket.emit("user-disconnected");
      } catch (err) {}

      delete codeToSession[code];
      delete SocketToSession[code];
    });
  });

  // join session : player2
  socket.on("join-session", (code, name) => {
    if (codeToSession[code] === undefined) {
      socket.emit("invalid-code");
    } else {
      codeToSession[code].JoinSession(name, socket);
      codeToSession[code].Broadcast(
        "valid-code",
        codeToSession[code].gameState
      );
      SocketToSession = {
        ...SocketToSession,
        [socket]: codeToSession,
      };

      delete codeToSession[code];
      socket.on("disconnect", () => {
        SocketToSession[socket].player_one_socket.emit("user-disconnected");

        delete SocketToSession[socket];
      });
    }
  });

  // game functions
  socket.on("player-move", (index, value) => {});
}

io.on("connection", socketEvens);
// io.on("connection", (socket) => {
//   console.log("a user connected !!");
// });

// const port = 3000;
// server.listen(port, () => {
//   console.log("Server is running on port: " + port);
// });

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port);
