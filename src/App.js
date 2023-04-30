// import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Button from "./Button.js";

export default class App extends Component {
  state = {
    currentNumber: 0,
    firstNumber: 0,
    secondNumber: 0,
    resultShown: false,
    operation: "",
  };

  count = (first, second, operator) => {
    let result;
    switch (operator) {
      case "+":
        result = first + second;
        break;
      case "-":
        result = first - second;
        break;
      case "x":
        result = first * second;
        break;
      case "÷":
        result = first / second;
        break;
    }
    return result;
  };

  handleCalculatorClick = (type, value) => {
    const { currentNumber, firstNumber, secondNumber, operation, resultShown } =
      this.state;
    if (type === "number") {
      const newCurrentNumber = parseInt(currentNumber.toString() + value);
      if (secondNumber > 0) {
        // Update current and second number
        this.setState({
          currentNumber: newCurrentNumber,
          secondNumber: newCurrentNumber,
        });
      } else if (firstNumber > 0) {
        // Set initial second value
        this.setState({ currentNumber: value, secondNumber: value });
      } else if (resultShown === true) {
        // Reset shown status and set initial number
        this.setState({ currentNumber: value, resultShown: false });
      } else if (currentNumber > 0) {
        // Update current number
        this.setState({ currentNumber: newCurrentNumber });
      } else {
        // Set initial number
        this.setState({ currentNumber: value });
      }
      return;
    }

    switch (value) {
      case "+":
        this.setState({
          firstNumber: currentNumber,
          operation: "+",
        });
        break;
      case "-":
        this.setState({
          firstNumber: currentNumber,
          operation: "-",
        });
        break;
      case "x":
        this.setState({
          firstNumber: currentNumber,
          operation: "x",
        });
        break;
      case "÷":
        this.setState({
          firstNumber: currentNumber,
          operation: "÷",
        });
        break;
      case "C":
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          currentNumber: 0,
          operation: "",
          resultShown: false,
        });
        break;
      case "√":
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          currentNumber: Math.sqrt(currentNumber),
          operation: "",
          resultShown: true,
        });
        break;
      case "=":
        // TODO: нормально ли тут использовать this? без него eslint ругается что функция undefined
        const result = this.count(firstNumber, secondNumber, operation);
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          currentNumber: result,
          operation: "",
          resultShown: true,
        });
        break;
    }
  };

  render() {
    const basicMath = ["+", "-", "x", "÷", "C"];
    const other = ["=", "√"];

    return (
      <div className="container">
        <input
          className="display"
          type="text"
          name=""
          id=""
          // defaultValue="0"
          readOnly
          value={this.state.currentNumber}
        />
        <div className="basicMath flex">
          {basicMath.map((item) => (
            <Button
              value={item}
              type="operation"
              callback={this.handleCalculatorClick}
            />
          ))}
        </div>
        <div className="numbers flex">
          {[...Array(10).keys()].map((item) => (
            <Button
              value={item}
              type="number"
              callback={this.handleCalculatorClick}
            />
          ))}
        </div>
        <div className="do flex">
          {other.map((item) => (
            <Button
              value={item}
              type="operation"
              callback={this.handleCalculatorClick}
            />
          ))}
        </div>
        <span id="currentOperation">{this.state.operation}</span>
      </div>
    );
  }
}
