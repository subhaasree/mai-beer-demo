import React from "react";
import "./logo.css";
import MaibeerLogo from "../../../Assests/maibeer-logo.svg";

function Logo() {
  return (
    <div className="Logo">
      <img src={MaibeerLogo} className="Logo" alt="logo" />
    </div>
  );
}

export default Logo;
