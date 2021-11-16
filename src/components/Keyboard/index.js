import React from "react";
import { Key } from "./Key";

const Keyboard = ({ calcData, handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

export { Keyboard };
