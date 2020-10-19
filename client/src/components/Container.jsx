import React, { useState, useEffect } from "react";
import Landing from "./Landing";
import socket from "./../Socket/socketport";
import Lobby from "./Lobby";


export default function Container() {
  const [landingView, setLandingView] = useState(true);
  const [lobbyView, setLobbyView] = useState(false);
  const [player1_name, setPlayer1_name] = useState("");
  const [lobby_waiting, setLobby_waiting] = useState(true);
  const [code, setCode] = useState("");
  const [isPlayer_one, setIsPlayer_one] = useState(false);

  const [gameState, setGameState] = useState({
    player1_name: "",
    player2_name: "",
    player1_score: 0,
    player2_score: 0,
    ties: 0,
    player1_turn: true,
    grid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    socket.on("session-created", (name, code) => {
      setLandingView(false);
      setLobbyView(true);
      setPlayer1_name(name);
      setCode(code);
      setIsPlayer_one(true);
    });

    socket.on("valid-code", (gameState) => {
      setLobby_waiting(false);
      setLandingView(false);
      setLobbyView(true);
      setGameState(gameState);
    });
  }, []);

  return (
    <div>
      {landingView ? <Landing /> : <div></div>}
      {lobbyView ? (
        <Lobby
          gamestate={gameState}
          waiting={lobby_waiting}
          code={code}
          isPlayer_one={isPlayer_one}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}


