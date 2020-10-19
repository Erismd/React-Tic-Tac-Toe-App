import React from "react";
import socket from "./../Socket/socketport";

export default function Panel(props) {
  const renderValue = (val) => {
    if (val === "1") {
      return "X";
    } else if (val === "-1") {
      return "◯";
    } else {
      return "";
    }
  };

  const playerMove = () => {
    if (
      props.gamestate.player1_turn === props.gamestate.isPlayer_one &&
      props.gamestate.grid[props.index] === 0
    ) {
      if (props.gamestate.isPlayer_one) {
        socket.emit("player-move", props.index, 1);
      } else {
        socket.emit("player-move", props.index, -1);
      }
    }
  };

  return (
    <div className="square-inner" onClick={playerMove}>
      {renderValue(props.val)}
    </div>
  );
}
