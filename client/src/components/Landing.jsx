import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import CreateSession from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import { AnimatePresence, motion } from "framer-motion";

const Landing = () => {
  const [modal_create, setModal_create] = useState(false);
  const [modal_join, setModal_join] = useState(false);

  const create_toggle = () => setModal_create(!modal_create);
  const join_toggle = () => setModal_join(!modal_join);

  return (
    <AnimatePresence>
      <motion.div
        className="landing"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="title">🎃Tic Tac Toe🎃</h1>

        <Button
          className="session-btn"
          color="dark"
          size="md"
          onClick={create_toggle}
        >
          Create Session
        </Button>
        <Modal isOpen={modal_create} toggle={create_toggle}>
          <ModalHeader toggle={create_toggle}></ModalHeader>
          <ModalBody>
            <CreateSession />
          </ModalBody>
        </Modal>

        <Button
          className="session-btn"
          color="dark"
          size="md"
          onClick={join_toggle}
        >
          Join Session
        </Button>
        <Modal isOpen={modal_join} toggle={join_toggle}>
          <ModalHeader toggle={join_toggle}></ModalHeader>
          <ModalBody>
            <JoinRoom />
          </ModalBody>
        </Modal>
      </motion.div>
    </AnimatePresence>
  );
};

export default Landing;
