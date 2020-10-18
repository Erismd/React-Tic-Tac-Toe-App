import React, { useState, useEffect } from "react";
import { InputGroup, Input, Button } from "reactstrap";
import { motion } from "framer-motion";
import socket from "./../Socket/socketport"

export default function JoinRoom() {


  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState(false);


  const submitPlayer = () => {
    if (code !== "" && name !== "") {
      socket.emit("join-session", code, name);
    }
  };

  useEffect(() => {
    socket.on("invalid-code", () => {
      setInvalid(true);
    });
  },[]);

  return (
    <div className="session-page">
      <InputGroup style={{ width: "95%", margin: "0 auto" }}>
        <Input
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          placeholder="username"
        />
      </InputGroup>
      <InputGroup style={{ width: "95%", margin: "0 auto" }}>
        <Input
          onChange={(e) => {
            setCode(e.target.value);
          }}
          name="code"
          placeholder="session code"
        />
      </InputGroup>
      <Button
        onClick={() => {
          submitPlayer();
        }}
        className="session-btn"
        color="primary"
      >
        Join Session
      </Button>
      {invalid ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <p style={{ color: "red" }}>Invalid Session Code</p>
        </motion.div>
      ) : (
        <></>
      )}
    </div>
  );
}



// export default class JoinRoom extends Component {
//   state = {
//     code: "",
//     name: "",
//     invalid: false,
//   };

//   updatePlayer = (e) => {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   };

//   submitPlayer = () => {
//     if (this.state["code"] !== "" && this.state["name"] !== "") {
//       socket.emit("join-session", this.state.code, this.state.name);
//     }
//   };

//   componentDidMount() {
//     socket.on("invalid-code", () => {
//       this.setState({ invalid: true });
//     });
//   }

//   render() {
//     return (
//       <div className="session-page">
//         <InputGroup style={{ width: "95%", margin: "0 auto" }}>
//           <Input
//             onChange={this.updatePlayer}
//             name="name"
//             placeholder="username"
//           />
//         </InputGroup>
//         <InputGroup style={{ width: "95%", margin: "0 auto" }}>
//           <Input
//             onChange={this.updatePlayer}
//             name="code"
//             placeholder="session code"
//           />
//         </InputGroup>
//         <Button
//           onClick={this.submitPlayer}
//           className="session-btn"
//           color="primary"
//         >
//           Join Session
//         </Button>
//         {this.state.invalid && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <p style={{ color: "red" }}>Invalid Session Code</p>
//           </motion.div>
//         )}
//       </div>
//     );
//   }
// }
