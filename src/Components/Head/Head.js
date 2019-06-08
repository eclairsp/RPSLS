import React from "react";
import "./head.css";

const Head = () => {
    return (
        <header>
            <div className="game-name">
                <span className="game-name-item" role="img" aria-label="rock">
                    ✊
                </span>
                <span className="game-name-item" role="img" aria-label="paper">
                    📄
                </span>
                <span
                    className="game-name-item"
                    role="img"
                    aria-label="scissor"
                >
                    ✂️
                </span>
                <span className="game-name-item" role="img" aria-label="lizard">
                    🦎
                </span>
                <span className="game-name-item" role="img" aria-label="spock">
                    🖖
                </span>
            </div>
            <div className="game-name">
                <span className="game-name-item">Rock</span>
                <span className="game-name-item">Paper</span>
                <span className="game-name-item">Scissor</span>
                <span className="game-name-item">Lizard</span>
                <span className="game-name-item">Spock</span>
            </div>
        </header>
    );
};

export default Head;
