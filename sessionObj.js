class Session {
  player_one_socket;
  player_two_socket;


  

  gameState = {
    player1_name: "",
    player2_name: "",
    player1_score: 0,
    player2_score: 0,
    ties: 0,
    player1_turn: true,
    grid: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  constructor(p1_name, p1_socket, code){
      this.gameState.player1_name = p1_name;
      this.player_one_socket = p1_socket;
      this.code = code;
  }

  JoinSession=(name,socket)=>{
    this.gameState.player2_name = name;
    this.player_two_socket = socket;
}

Broadcast=(event,data) => {
    this.player_one_socket.emit(event, data);
    this.player_two_socket.emit(event, data);
}
}



module.exports = {
    Session:Session
}