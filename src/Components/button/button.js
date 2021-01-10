import React from "react";
import "../button/button.css";

import ArrowRight from "../../Assests/arrow_right.png";

function Button(props) {
  const { text, arrow, ...rest } = props;
  return (
    <button {...rest}>
      {arrow === "left" && (
        <span className="btn-icon left">
          <img src={ArrowRight} alt="" />
        </span>
      )}
      {text}
      {arrow === "right" && (
        <span className="btn-icon right">
          <img src={ArrowRight} alt="" />
        </span>
      )}
    </button>
  );
}

Button.defaultProps = {
  text: "Button Text",
  arrow: null,
};

export default Button;
