import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Spinner } from "reactstrap";
import Board from "./Board";
import Stats from "./Stats";
import Announcement from "./Announcement";
import io from "socket.io-client";


export default function Loading (props) {
    return (
        <AnimatePresence>
            <motion.div  className = "loading_lobby" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
                <h5>Waiting for someone to join</h5>
                <Spinner color="dark"></Spinner>
                <h6>Click to Copy Room Code: </h6>
    <Button onClick={()=>{navigator.clipboard.writeText(props.code)}}>{props.code}</Button>
            </motion.div>
        </AnimatePresence>
    )
}