// import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Button from "./Button.js";

export default class App extends Component {
  state = {
    currentNumber: 0,
    firstNumber: 0,
    secondNumber: 0,
    result: 0,
    operation: "",
  };

  handleCalculatorClick = (type, value) => {
    if (type === "number") {
      if (this.state.secondNumber > 0) {
        const newCurrentNumber = this.state.currentNumber.toString() + value;
        this.setState({
          currentNumber: newCurrentNumber,
          secondNumber: newCurrentNumber,
        });
      } else if (
        this.state.firstNumber > 0 &&
        this.state.operation.length > 0
      ) {
        this.setState({ currentNumber: value, secondNumber: value });
      } else if (this.state.currentNumber > 0) {
        // Combine number with current number
        const newCurrentNumber = this.state.currentNumber.toString() + value;
        this.setState({ currentNumber: newCurrentNumber });
      } else {
        // Set initial number
        this.setState({ currentNumber: value });
      }
      return;
    }

    // setCurrentOperation = (operation) => {
    //   document.querySelector("#currentOperation").innerHTML;
    // };

    switch (value) {
      case "+":
        this.setState({
          firstNumber: this.state.currentNumber,
          operation: "+",
        });
        break;
      case "-":
        this.setState({
          firstNumber: this.state.currentNumber,
          operation: "-",
        });
        break;
      case "x":
        this.setState({
          firstNumber: this.state.currentNumber,
          operation: "x",
        });
        break;
      case "÷":
        this.setState({
          firstNumber: this.state.currentNumber,
          operation: "÷",
        });
        break;
      case "=":
        console.log(this.state.firstNumber);
        console.log(this.state.secondNumber);
        const result = this.state.firstNumber + this.state.secondNumber;
        console.log(`success ${result}`);
        this.setState({
          firstNumber: 0,
          secondNumber: 0,
          currentNumber: result,
          operation: "",
        });
        break;
    }
  };

  render() {
    const basicMath = ["+", "-", "x", "÷"];
    // const numbers = [0..9];

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
          <Button
            value="="
            type="operation"
            callback={this.handleCalculatorClick}
          />
        </div>
        <span id="currentOperation">{this.state.operation}</span>
      </div>
    );
  }
}
