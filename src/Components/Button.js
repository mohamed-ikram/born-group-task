import React from "react";
import "./Button.css";
const Button = (props) => {
  return (
    <button
      className="button"
      type="button"
      onClick={props.onClick}
      style={{ backgroundColor: props.backgroundColor }}
    >
      {props.children}
    </button>
  );
};

export default Button;
