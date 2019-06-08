import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = ({children, open, close}) => {
    const content = open
        ? ReactDOM.createPortal(
              <section className="modal">
                  <section className="modal-content">
                      <button
                          className="rules-close-btn"
                          onClick={() => close()}
                      >
                          X
                      </button>
                      {children}
                  </section>
              </section>,
              document.body
          )
        : null;
    return content;
};

export default Modal;
