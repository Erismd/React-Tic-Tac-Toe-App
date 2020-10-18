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
  socket.on("player-move", (index, value) => {
    SocketToSession[socket].PlayerMove(index, value);

    switch (SocketToSession[socket].checkWinner()) {
      case "player_one":
        SocketToSession[socket].Broadcast("announcement", "player_one");
        break;
      case "player_two":
        SocketToSession[socket].Broadcast("announcement", "player_two");
        break;
      case "tie":
        SocketToSession[socket].Broadcast("announcement", "tie");
        break;
      case "ongoing":
        break;
      default:
        console.log("no switch cases hit");
    }

    //TODO: check winners before broadcasting
    SocketToSession[socket].Broadcast(
      "update",
      SocketToSession[socket].gameState
    );
  });
}

io.on("connection", socketEvens);

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port);
