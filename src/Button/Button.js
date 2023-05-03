import { Component } from "react";
import "./Button.css";

export default class Button extends Component {
  handleClick = (event) => {
    console.log(event.target.value);
    this.props.callback(this.props.type, this.props.value);
  };

  render() {
    return (
      <input
        type="button"
        className="button"
        onClick={this.handleClick}
        value={this.props.value}
      />
    );
  }
}
