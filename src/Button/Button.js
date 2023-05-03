import { Component } from "react";
import "./Button.css";

export default class Button extends Component {
  handleClick = () => this.props.callback(this.props.type, this.props.value);
  
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
