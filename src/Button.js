import { Component } from "react";
import "./Button.css";
import classNames from "classnames";

export default class Button extends Component {
  handleClick = (event) => {
    console.log(event.target.value);
    this.props.callback(this.props.type, this.props.value);
  };

  render() {
    const btnClass = classNames({
      button: true,
      number: this.props.type === "number",
    });

    return (
      <input
        type="button"
        className={btnClass}
        onClick={this.handleClick}
        value={this.props.value}
      />
    );
  }
}
