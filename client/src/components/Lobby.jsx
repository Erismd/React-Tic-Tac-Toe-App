import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spinner } from "reactstrap";
import Board from "./Board";
import Stats from "./Stats";
import Announcement from "./Announcement";
import socket from "./../Socket/socketport";
import Loading from "./Loading";
import Game from "./Game";

export default function Lobby(props) {
  //const [isPlayer_one, setIsPlayer_one] = useState(props.isPlayer_one);
  const [code, setCode] = useState(props.code);
  const [gamestate, setGameState] = useState(props.gamestate);

  useEffect(() => {
    socket.on("update", (gamestate) => {
      setGameState(gamestate);
    });
  }, []);

  return (
    <div>
      {props.waiting ? (
        <Loading code={code} />
      ) : (
        <Game gamestate={gamestate} isPlayer_one={props.isPlayer_one} />
      )}
    </div>
  );
}





