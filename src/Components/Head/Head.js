import React from "react";
import "./head.css";

const Head = () => {
    return (
        <header>
            <div className="game-name">
                <span role="img" aria-label="rock">
                    ✊
                </span>
                <span role="img" aria-label="paper">
                    📄
                </span>
                <span role="img" aria-label="scissor">
                    ✂️
                </span>
                <span role="img" aria-label="lizard">
                    🦎
                </span>
                <span role="img" aria-label="spock">
                    🖖
                </span>
            </div>
            <div className="game-name">
                <span>Rock</span>
                <span>Paper</span>
                <span>Scissor</span>
                <span>Lizard</span>
                <span>Spock</span>
            </div>
        </header>
    );
};

export default Head;
