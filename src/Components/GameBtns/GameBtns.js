import React from "react";
import "./game-btns.css";

const GameBtns = props => {
    return (
        <section className="game-help-btn-wrapper">
            <button className="game-help-btn">Rules</button>
            <button onClick={() => props.reset()} className="game-help-btn">
                Reset
            </button>
        </section>
    );
};

export default GameBtns;
