import React from "react";
import { Spinner } from "reactstrap";
import { AnimatePresence, motion } from "framer-motion";
import "./../"

export default function Stats(props) {
  const centeredStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const gamestate = props.gamestate;
  const isPlayer_one = props.isPlayer_one;
  //const opponent_name = isPlayer_one ? gamestate.player2_name : gamestate.player1_name;
  //const wins = isPlayer_one ? gamestate.player1_score : gamestate.player2_score;
  //const losses = isPlayer_one ? gamestate.player2_score : gamestate.player1_score;
  const ties = gamestate.ties;
  let opponent_name;
  let wins;
  let losses;
 
  if(isPlayer_one){
    opponent_name = gamestate.player2_name;
    wins = gamestate.player1_score;
    losses = gamestate.player2_score
  }else{
    opponent_name = gamestate.player1_name;
    wins = gamestate.player2_score;
    losses = gamestate.player1_score;
  }

  console.log("name: ", opponent_name)
  return (
    <AnimatePresence>
      <motion.div
        className="stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {gamestate.player1_turn === isPlayer_one ? (
          <div className="turn">
            <h5>Your Turn</h5>
          </div>
        ) : (
          <div
            className="turn"
            style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}
          >
            <h5>Opponent's Turn</h5>
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner color="dark"></Spinner>
            </div>
          </div>
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
          <div style={centeredStyle}>
            <p>Wins</p>
          </div>
          <div style={centeredStyle}>
            <p>Ties</p>
          </div>
          <div style={centeredStyle}>
            <p>Losses</p>
          </div>
          <div style={centeredStyle}>
            <p>{wins}</p>
          </div>
          <div style={centeredStyle}>
            <p>{ties}</p>
          </div>
          <div style={centeredStyle}>
            <p>{losses}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
