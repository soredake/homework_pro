import "./App.css";
import { Component } from "react";
import Button from "../Button/Button.js";

export default class App extends Component {
  state = {
    currentNumber: 0,
    firstNumber: 0,
    secondNumber: 0,
    isFirstNumberSet: false,
    isSecondNumberSet: false,
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
      case "%":
        result = (first * second) / 100;
        break;
    }
    return Number(Math.round(result + "e15") + "e-15");
  };

  handleCalculatorClick = (type, value) => {
    const {
      currentNumber,
      firstNumber,
      isFirstNumberSet,
      secondNumber,
      isSecondNumberSet,
      operation,
      resultShown,
    } = this.state;
    const currentNumberString = currentNumber.toString();

    if (type === "number") {
      const isComaFound = currentNumberString.includes(".");
      const newCurrentNumber = parseFloat(currentNumberString + value);
      if (value === "." && isComaFound) {
        return;
      } else if (value === ".") {
        this.setState({ currentNumber: currentNumber + value });
      } else if (
        isFirstNumberSet &&
        operation.length > 0 &&
        !isSecondNumberSet
      ) {
        // Set initial second value
        this.setState({
          currentNumber: value,
          secondNumber: value,
          isSecondNumberSet: true,
        });
      } else if (isSecondNumberSet) {
        // Update current and second number
        this.setState({
          currentNumber: newCurrentNumber,
          secondNumber: newCurrentNumber,
        });
      } else if (resultShown === true) {
        // Reset shown status and set initial number
        this.setState({ currentNumber: value, resultShown: false });
      } else if (currentNumber && value !== ".") {
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
      case "-":
      case "x":
      case "÷":
      case "%":
        this.setState({
          isFirstNumberSet: true,
          firstNumber: currentNumber,
          operation: value,
        });
        break;
      case "C":
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          isFirstNumberSet: false,
          isSecondNumberSet: false,
          currentNumber: 0,
          operation: "",
          resultShown: false,
        });
        break;
      case "⌫":
        if (currentNumberString.length > 1) {
          const newCurrentNumber = parseFloat(
            currentNumberString.replace(/.$/, "")
          );
          this.setState({ currentNumber: newCurrentNumber });
        } else {
          this.setState({ currentNumber: 0 });
        }
        break;
      case "√":
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          isFirstNumberSet: false,
          isSecondNumberSet: false,
          currentNumber: Math.sqrt(currentNumber),
          operation: "",
          resultShown: true,
        });
        break;
      case "x²":
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          isFirstNumberSet: false,
          isSecondNumberSet: false,
          currentNumber: Math.pow(currentNumber, 2),
          operation: "",
          resultShown: true,
        });
        break;
      case "=":
        if (operation) {
          const result = this.count(firstNumber, secondNumber, operation);
          this.setState({
            firstNumber: 0,
            secondNumber: 0,
            isFirstNumberSet: false,
            isSecondNumberSet: false,
            currentNumber: result,
            operation: "",
            resultShown: true,
          });
        }
        break;
    }
  };

  render() {
    const basicMath = ["+", "-", "x", "÷", "C"];
    const other = ["√", "x²", "%", "⌫"];

    return (
      <div className="container calculator">
        <input
          className="display"
          type="text"
          readOnly
          value={this.state.currentNumber}
        />
        <div className="basic-math flex">
          {basicMath.map((item) => (
            <Button
              value={item}
              type="operation"
              callback={this.handleCalculatorClick}
            />
          ))}
        </div>
        <div className="other flex">
          {other.map((item) => (
            <Button
              value={item}
              type="operation"
              other="true"
              callback={this.handleCalculatorClick}
            />
          ))}
        </div>
        <div className="numbers flex flex-wrap">
          {[...Array(10).keys()].map((item) => (
            <Button
              value={item}
              type="number"
              callback={this.handleCalculatorClick}
            />
          ))}
          <Button
            value="."
            type="number"
            callback={this.handleCalculatorClick}
          />
        </div>
        <div className="result flex">
          <Button
            value="="
            type="operation"
            callback={this.handleCalculatorClick}
          />
        </div>
        <span className="current-operation">
          Текущая операция: {this.state.operation}
        </span>
      </div>
    );
  }
}
