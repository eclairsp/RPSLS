import React from "react";
import ReactDOM from "react-dom";
import "./rules.css";

const Rules = ({open, close}) => {
    const rule = open
        ? ReactDOM.createPortal(
              <section className="rules-modal">
                  <section className="rules">
                      <button
                          className="rules-close-btn"
                          onClick={() => close()}
                      >
                          X
                      </button>
                      <h1 className="rules-head">How to play?</h1>
                      <ul className="rules-list">
                          <li className="rules-list-item">
                              Click on the emoji on your side to choose it.
                          </li>
                          <li className="rules-list-item">
                              The game is best of three. First to three points
                              wins
                          </li>
                          <li className="rules-list-item">
                              Every time the player wins the circle at top turn
                              green.
                          </li>
                          <li className="rules-list-item">
                              you can view the outcome below the game window in
                              the white block.
                          </li>
                      </ul>
                      <h1 className="rules-head">Game rules</h1>
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
                  </section>
              </section>,
              document.body
          )
        : null;
    return rule;
};

export default Rules;
