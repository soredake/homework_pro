import { Component } from "react";
import "./Button.css";
// import "classnames";

export default class Button extends Component {
  // const { action } = this.props;
  handleClick = (event) => {
    console.log(event.target.value);
    this.props.callback(this.props.type, this.props.value);
  };

  render() {
    // const { img, title, content } = this.props;
    // let classes = "button";
    // if (isPressed) {
    //   // Приходится конкатенировать классы
    //   classes += " number";
    // }
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
