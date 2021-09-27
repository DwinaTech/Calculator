import React from "react";

const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "X" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const characterSimple = ["AC", "/", "X", "+", "-", "="];

const numbersMapping = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const CalcKey = ({ keyData: { id, value }, handleInput }) => {
  const hnadleClick = () => {
    handleInput(value);
  };
  return (
    <button id={id} onClick={hnadleClick}>
      {value}
    </button>
  );
};

const validValue = (value, input) => {
  switch (value) {
    case "AC":
      return 0;
    case numbersMapping[value]:
      return !characterSimple.includes(input) && input !== 0
        ? `${input}${value}`
        : value;
    case ".": {
      return !characterSimple.includes(input) && !input.toString().includes(".")
        ? `${input}${value}`
        : input;
    }
    default:
      return value;
  }
};

const App = () => {
  const [output, setOutput] = React.useState("");
  const [input, setInput] = React.useState("0");

  const handleOutput = (currentInput, value) => {
    console.log({ value });
    switch (value) {
      case "AC":
        setOutput("");
        break;
      case "+":
        setOutput(`${currentInput} +`);
        break;
        // case va:
        //   setOutput("");
        break;
      default:
        setOutput(currentInput);
    }
  };

  const handleInput = (value) => {
    const currentInput = validValue(value, input);
    console.log({ currentInput });

    setInput(currentInput);
    handleOutput(input, value);
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="output">
          <span className="result">{output}</span>
          <span className="input">{input}</span>
        </div>
        <div className="keys">
          {calcData.map((key) => (
            <CalcKey key={key.id} keyData={key} handleInput={handleInput} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
