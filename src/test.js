import React from "react";
import { Keyboard } from "./components/Keyboard";
import { Output } from "./components/Output";

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

const operators = ["AC", "/", "X", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const App = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [selectedOperator, setSelectedOperator] = React.useState("");
  const [numberBeforeOperator, setNumberBeforeOperator] = React.useState("");
  const [numberAfterOperator, setNumberAfterOperator] = React.useState("");

  const handleSubmit = () => {
    const calc = `${numberBeforeOperator} ${selectedOperator} ${numberAfterOperator} =`;
    switch (selectedOperator) {
      case "+":
        setOutput(
          `${calc} ${
            Number(numberBeforeOperator) + Number(numberAfterOperator)
          }`
        );
        break;
      case "-":
        setOutput(
          `${calc} ${
            Number(numberBeforeOperator) - Number(numberAfterOperator)
          }`
        );
        break;
      case "/":
        {
          const num =
            Number(numberBeforeOperator) / Number(numberAfterOperator);
          setOutput(`${calc} ${Math.round(num * 100) / 100}`);
        }
        break;
      case "X":
        {
          const num =
            Number(numberBeforeOperator) * Number(numberAfterOperator);
          setOutput(`${calc} ${Math.round(num * 100) / 100}`);
        }
        break;

      default:
        break;
    }
  };

  const handleClear = () => {
    setSelectedOperator("");
    setNumberAfterOperator("");
    setNumberBeforeOperator("");
  };

  const handleZero = (position) => {
    if (position === "before") {
      if (numberBeforeOperator === "0") {
        setNumberBeforeOperator("0");
      } else {
        setNumberBeforeOperator(`${numberBeforeOperator}${0}`);
      }
    } else {
      if (numberAfterOperator === "0") {
        setNumberAfterOperator("0");
      } else {
        setNumberAfterOperator(`${numberAfterOperator}${0}`);
      }
    }
  };

  const handleNumbers = (value) => {
    if (selectedOperator) {
      if (value === 0) {
        handleZero("after");
      } else {
        setNumberAfterOperator(`${numberAfterOperator}${value}`);
      }
    } else {
      if (value === 0) {
        handleZero("before");
      } else {
        setNumberBeforeOperator(`${numberBeforeOperator}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const hasDot = (num) => num.split("").find((dot) => dot === ".");

    if (selectedOperator) {
      if (!hasDot(numberAfterOperator)) {
        setNumberAfterOperator(`${numberAfterOperator}.`);
      }
    } else {
      if (!hasDot(numberBeforeOperator)) {
        setNumberBeforeOperator(`${numberBeforeOperator}.`);
      }
    }
  };

  const handleOperators = (operator) => {
    setSelectedOperator(operator);
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(
      `${numberBeforeOperator} ${selectedOperator} ${numberAfterOperator}`
    );
    setInput(
      `${numberBeforeOperator} ${selectedOperator} ${numberAfterOperator}`
    );
  };

  React.useEffect(() => {
    handleOutput();
  }, [selectedOperator, numberBeforeOperator, numberAfterOperator]);

  return (
    <div className="container">
      <div className="calculator">
        <Output input={input} output={output} />
        <Keyboard calcData={calcData} handleInput={handleInput} />
      </div>
    </div>
  );
};

export default App;
