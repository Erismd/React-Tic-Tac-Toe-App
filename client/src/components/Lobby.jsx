import React, { useState, useEffect } from "react";
import socket from "./../Socket/socketport";
import Loading from "./Loading";
import Game from "./Game";

export default function Lobby(props) {
  const [gamestate, setGameState] = useState(props.gamestate);

  useEffect(() => {
    socket.on("update", (gamestate) => {
      setGameState(gamestate);
    });
    setGameState(props.gamestate);
  }, []);

  return (
    <div>
      {props.waiting ? (
        <Loading code={props.code} />
      ) : (
        <Game gamestate={gamestate} isPlayer_one={props.isPlayer_one} />
      )}
    </div>
  );
}
