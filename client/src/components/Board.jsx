import React from "react";
import Panel from "./Panels";

export default function Board(props) {
  return (
    <div className="board">
      {props.gamestate.grid.map((value, index) => {
        return (
          <Panel
            val={value.toString()}
            index={index}
            gamestate={{ isPlayer_one: props.isPlayer_one, ...props.gamestate }}
          />
        );
      })}
    </div>
  );
}
