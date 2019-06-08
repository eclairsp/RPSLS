import React from "react";
import posed, {PoseGroup} from "react-pose";
import Head from "./../Head/Head";
import GameBtns from "./../GameBtns/GameBtns";
import Move from "./../Move/Move";
import Modal from "./../Modal/Modal";
import Emoji from "./Emoji";
import "./game.css";

const GameSec = posed.section({
    enter: {opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        opacity: 0,
        transition: {duration: 200}
    }
});

const Reset = props => (
    <svg
        className="spin"
        fill={props.color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
    >
        <path d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z" />
    </svg>
);

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: localStorage.getItem("name")
                ? localStorage.getItem("name")
                : "YOU",
            userSelection: null,
            computerSelection: null,
            shuffler: [1, 2, 4, 5],
            chances: 1,
            userScoreNum: 0,
            userScore: [false, false, false],
            computerScoreNum: 0,
            computerScore: [false, false, false],
            message: "startmessage",
            showRules: false,
            showChangeName: false
        };
    }

    componentDidMount() {
        // changes URL with new emoji every .5s

        var emojiURL = ["✊", "📄", "✂️", "🦎", "🖖"];

        setInterval(() => {
            window.location.hash = emojiURL[this.getRandomChoiceForComputer(5)];
        }, 500);
    }

    checkWinner = () => {
        if (this.state.chances > 0 || this.state.chances < 4) {
            if (this.state.userSelection === this.state.computerSelection) {
                this.setState({
                    message: "Tie"
                });
            } else if (
                (this.state.userSelection === "R" &&
                    (this.state.computerSelection === "L" ||
                        this.state.computerSelection === "S")) ||
                (this.state.userSelection === "P" &&
                    (this.state.computerSelection === "R" ||
                        this.state.computerSelection === "K")) ||
                (this.state.userSelection === "S" &&
                    (this.state.computerSelection === "P" ||
                        this.state.computerSelection === "L")) ||
                (this.state.userSelection === "L" &&
                    (this.state.computerSelection === "P" ||
                        this.state.computerSelection === "K")) ||
                (this.state.userSelection === "K" &&
                    (this.state.computerSelection === "S" ||
                        this.state.computerSelection === "R"))
            ) {
                if (this.state.userScoreNum < 3) {
                    this.setState({
                        userScoreNum: this.state.userScoreNum + 1
                    });
                    let userScoreCopy = this.state.userScore;
                    userScoreCopy[this.state.userScoreNum] = true;
                    this.setState({
                        userScore: userScoreCopy,
                        message:
                            this.state.userSelection +
                            this.state.computerSelection
                    });
                }
            } else {
                if (this.state.computerScoreNum < 3) {
                    this.setState({
                        computerScoreNum: this.state.computerScoreNum + 1
                    });
                    let computerScoreCopy = this.state.computerScore;
                    computerScoreCopy[this.state.computerScoreNum] = true;
                    this.setState({
                        computerScore: computerScoreCopy,
                        message:
                            this.state.computerSelection +
                            this.state.userSelection
                    });
                }
            }
        }
    };

    handleUserSelection = selectionUser => {
        let computerRandomChoice = this.getRandomChoiceForComputer(5);
        let computerChoice;

        switch (computerRandomChoice) {
            case 0:
                computerChoice = "R";
                break;
            case 1:
                computerChoice = "P";
                break;
            case 2:
                computerChoice = "S";
                break;
            case 3:
                computerChoice = "L";
                break;
            case 4:
                computerChoice = "K";
                break;
            default:
                computerChoice = "S";
        }

        this.setState(
            {
                userSelection: selectionUser,
                computerSelection: computerChoice,
                chances: this.state.chances > 0 ? this.state.chances - 1 : 0
            },
            () => {
                this.checkWinner();
            }
        );
    };

    getRandomChoiceForComputer = max => {
        return Math.floor(Math.random() * Math.floor(max));
    };

    doReset = () => {
        this.setState({
            userSelection: null,
            computerSelection: null,
            chances: 3,
            userScoreNum: 0,
            userScore: [false, false, false],
            computerScoreNum: 0,
            computerScore: [false, false, false],
            message: "startmessage",
            showRules: false,
            showChangeName: false
        });
    };

    toggleRules = () => {
        this.setState({
            showRules: !this.state.showRules
        });
    };

    toggleChangeName = () => {
        this.setState({
            showChangeName: !this.state.showChangeName
        });
    };

    inputNameChange = e => {
        this.setState({
            name: e.target.value
        });
    };

    submitName = () => {
        this.setState({
            showChangeName: !this.state.showChangeName
        });
        localStorage.setItem("name", this.state.name);
    };

    render() {
        return (
            <>
                <Head />

                <PoseGroup>
                    {this.state.userScoreNum < 3 &&
                        this.state.computerScoreNum < 3 && (
                            <GameSec key="actual-game" className="game">
                                <section className="control-section user-section">
                                    <h1 className="player-name">
                                        {" "}
                                        {this.state.name}{" "}
                                    </h1>
                                    <header className="score">
                                        {this.state.userScore.map(
                                            (val, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            this.state
                                                                .userScore[
                                                                index
                                                            ]
                                                                ? "score-circle score-circle-point"
                                                                : "score-circle"
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </header>
                                    <div className="selection">
                                        {Emoji.map((val, index) => {
                                            return (
                                                <span
                                                    key={val.short_name}
                                                    className={
                                                        this.state
                                                            .userSelection ===
                                                        val.short_name
                                                            ? "selection-emoji order-3"
                                                            : "selection-emoji"
                                                    }
                                                    role="img"
                                                    aria-label={val.name}
                                                    onClick={() =>
                                                        this.handleUserSelection(
                                                            val.short_name
                                                        )
                                                    }
                                                >
                                                    {val.emoji}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </section>

                                <h1 className="middle-section">V/S</h1>

                                <section className="control-section computer-section">
                                    <h1 className="player-name"> COMPUTER </h1>
                                    <header className="score">
                                        {this.state.computerScore.map(
                                            (val, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={
                                                            this.state
                                                                .computerScore[
                                                                index
                                                            ]
                                                                ? "score-circle score-circle-point"
                                                                : "score-circle"
                                                        }
                                                    />
                                                );
                                            }
                                        )}
                                    </header>
                                    <div className="selection">
                                        {Emoji.map((val, index) => {
                                            return (
                                                <span
                                                    key={val.short_name}
                                                    className={
                                                        this.state
                                                            .computerSelection ===
                                                        val.short_name
                                                            ? "selection-emoji order-3"
                                                            : "selection-emoji"
                                                    }
                                                    role="img"
                                                    aria-label={val.name}
                                                >
                                                    {val.emoji}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </section>
                            </GameSec>
                        )}

                    {!(
                        this.state.userScoreNum < 3 &&
                        this.state.computerScoreNum < 3
                    ) && (
                        <GameSec key="afte-win" className="game-winner">
                            {this.state.userScoreNum === 3 ? (
                                <>
                                    <h1>{this.state.name} WON</h1>
                                    <h1>{`${this.state.userScoreNum} : ${
                                        this.state.computerScoreNum
                                    }`}</h1>
                                </>
                            ) : (
                                <>
                                    <h1>COMPUTER WON</h1>
                                    <h1>{`${this.state.computerScoreNum} : ${
                                        this.state.userScoreNum
                                    }`}</h1>
                                </>
                            )}
                            <button
                                onClick={() => this.doReset()}
                                className="game-help-btn"
                            >
                                <Reset color="white" />
                            </button>
                        </GameSec>
                    )}
                </PoseGroup>

                <>
                    <Modal open={this.state.showRules} close={this.toggleRules}>
                        <h1 className="modal-head">How to play?</h1>
                        <ul className="rules-list">
                            <li className="rules-list-item">
                                Click on the emoji on your side to choose it.
                            </li>
                            <li className="rules-list-item">
                                The game is best of three. First to three points
                                wins
                            </li>
                            <li className="rules-list-item">
                                Every time the player wins the circle at top
                                turn green.
                            </li>
                            <li className="rules-list-item">
                                you can view the outcome below the game window
                                in the white block.
                            </li>
                        </ul>
                        <h1 className="modal-head">Game rules</h1>
                        <ul className="rules-list">
                            <li className="rules-list-item">
                                Scissors{" "}
                                <span role="img" aria-label="scissor">
                                    ✂️
                                </span>{" "}
                                cuts Paper{" "}
                                <span role="img" aria-label="paper">
                                    📄
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Paper{" "}
                                <span role="img" aria-label="paper">
                                    📄
                                </span>{" "}
                                covers Rock{" "}
                                <span role="img" aria-label="rock">
                                    ✊
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Rock{" "}
                                <span role="img" aria-label="rock">
                                    ✊
                                </span>{" "}
                                crushes Lizard{" "}
                                <span role="img" aria-label="lizard">
                                    🦎
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Lizard{" "}
                                <span role="img" aria-label="lizard">
                                    🦎
                                </span>{" "}
                                poisons Spock{" "}
                                <span role="img" aria-label="spock">
                                    🖖
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Spock{" "}
                                <span role="img" aria-label="spock">
                                    🖖
                                </span>{" "}
                                smashes Scissors{" "}
                                <span role="img" aria-label="scissor">
                                    ✂️
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Scissors{" "}
                                <span role="img" aria-label="scissor">
                                    ✂️
                                </span>{" "}
                                decapitates Lizard{" "}
                                <span role="img" aria-label="lizard">
                                    🦎
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Lizard{" "}
                                <span role="img" aria-label="lizard">
                                    🦎
                                </span>{" "}
                                eats Paper{" "}
                                <span role="img" aria-label="paper">
                                    📄
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Paper{" "}
                                <span role="img" aria-label="paper">
                                    📄
                                </span>{" "}
                                disproves Spock{" "}
                                <span role="img" aria-label="spock">
                                    🖖
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                Spock{" "}
                                <span role="img" aria-label="spock">
                                    🖖
                                </span>{" "}
                                vaporizes Rock{" "}
                                <span role="img" aria-label="rock">
                                    ✊
                                </span>
                                ,
                            </li>
                            <li className="rules-list-item">
                                and as it always has, Rock{" "}
                                <span role="img" aria-label="rock">
                                    ✊
                                </span>{" "}
                                crushes Scissors{" "}
                                <span role="img" aria-label="scissor">
                                    ✂️
                                </span>
                                .
                            </li>
                        </ul>
                    </Modal>
                </>

                <>
                    <Modal
                        open={this.state.showChangeName}
                        close={this.toggleChangeName}
                    >
                        <h1 className="modal-head">Change name</h1>
                        <input
                            className="name-input"
                            type="text"
                            placeholder="Type the name ..."
                            onChange={e => this.inputNameChange(e)}
                        />
                        <button
                            onClick={() => {
                                this.submitName();
                            }}
                            className="game-help-btn name-btn"
                        >
                            Change
                        </button>
                    </Modal>
                </>

                <Move
                    msg={
                        !(
                            this.state.userScoreNum < 3 &&
                            this.state.computerScoreNum < 3
                        )
                            ? "endmessage"
                            : this.state.message
                    }
                    name={this.state.name}
                />
                <GameBtns
                    reset={this.doReset}
                    rules={this.toggleRules}
                    changeName={this.toggleChangeName}
                />
            </>
        );
    }
}
