import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spinner } from "reactstrap";
import Board from "./Board";
import Stats from "./Stats";
import Announcement from "./Announcement";
import socket from "./../Socket/socketport";

export default function Game(props) {
  const [announce, setAnnounce] = useState(false);
  const [message, setMessage] = useState("");
  const [opponentDisconnected, setOpponentDisconnected] = useState(false);

  useEffect(() => {
    socket.on("announcement", (text) => {
      switch (text) {
        case "player_one":
          {
            if (props.isPlayer_one) {
              setAnnounce(true);
              setMessage("You Won!");
            } else {
              setAnnounce(true);
              setMessage("You Lost!");
            }
          }
          break;

        case "player_two":
          if (props.isPlayer_one) {
            setAnnounce(true);
            setMessage("You Lost!");
          } else {
            setAnnounce(true);
            setMessage("You Won!");
          }
          break;

        case "tie":
          setAnnounce(true);
          setMessage("Tie");
          break;
      }

      setTimeout(() => {
        setAnnounce(false);
      }, 1250);
    });

    socket.on("user-disconnected", () => {
      setOpponentDisconnected(true);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {opponentDisconnected ? (
        <AnimatePresence>
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              position: "absolute",
              left: "0%",
              top: "0%",
              width: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h6>Opponent Disconnected..</h6>
          </motion.div>
        </AnimatePresence>
      ) : (
        <div className="game">
          <div className="board-container">
            <Board
              gamestate={props.gamestate}
              isPlayer_one={props.isPlayer_one}
            />
          </div>
          <div className="stats-container">
            {announce ? <Announcement>{message}</Announcement> :
            <Stats
              gamestate={props.gamestate}
              isPlayer_one={props.isPlayer_one}
            />
      }
          </div>
        </div>
      )}
    </div>
  );
}
