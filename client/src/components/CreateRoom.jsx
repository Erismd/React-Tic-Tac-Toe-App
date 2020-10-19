import React, { useState } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import socket from "./../Socket/socketport";

export default function CreateRoom() {
  const [player1_name, setPlayer1_name] = useState("");

  const createSession = (e) => {
    if (player1_name !== "") {
      socket.emit("create-session", player1_name);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="session-page">
      <InputGroup>
        <Input
          placeholder="username"
          onChange={(e) => {
            setPlayer1_name(e.target.value);
          }}
        ></Input>
      </InputGroup>
      <Button className="session-btn" color="dark" onClick={createSession}>
        Create room & Join!
      </Button>
    </div>
  );
}

