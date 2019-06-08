import React from "react";
import Messages from "./Messages";
import "./move.css";

const Move = ({msg, name}) => {
    return (
        <section className="move-wrapper">
            {msg === "startmessage"
                ? Messages[msg].replace("YOU", name)
                : Messages[msg]}
        </section>
    );
};

export default Move;
