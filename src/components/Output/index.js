import React from "react";

const Output = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span className="input">{input}</span>
  </div>
);

export { Output };
