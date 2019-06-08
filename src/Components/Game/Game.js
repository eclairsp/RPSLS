import React from "react";
import posed, {PoseGroup} from "react-pose";
import Head from "./../Head/Head";
import GameBtns from "./../GameBtns/GameBtns";
import Move from "./../Move/Move";
import Rules from "./../Rules/Rules";
import Emoji from "./Emoji";
import "./game.css";

const GameSec = posed.section({
    enter: {opacity: 1, delay: 300, staggerChildren: 50},
    exit: {
        opacity: 0,
        transition: {duration: 200}
    }
});

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userSelection: null,
            computerSelection: null,
            shuffler: [1, 2, 4, 5],
            chances: 1,
            userScoreNum: 0,
            userScore: [false, false, false],
            computerScoreNum: 0,
            computerScore: [false, false, false],
            message: "startmessage",
            showRules: false
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
            showrules: false
        });
    };

    toggleRules = () => {
        this.setState({
            showRules: !this.state.showRules
        });
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
                                    <h1> YOU </h1>
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
                                    <h1> COMPUTER </h1>
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
                                    <h1>YOU WON</h1>
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
                                Replay
                            </button>
                        </GameSec>
                    )}
                </PoseGroup>

                <>
                    <Rules
                        open={this.state.showRules}
                        close={this.toggleRules}
                    />
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
                />
                <GameBtns reset={this.doReset} rules={this.toggleRules} />
            </>
        );
    }
}
