import React from "react";
import Messages from "./Messages";
import "./move.css";

const Move = props => {
    return <section className="move-wrapper">{Messages[props.msg]}</section>;
};

export default Move;
