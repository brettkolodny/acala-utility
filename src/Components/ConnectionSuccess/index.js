import React, { useEffect } from "react";
import "./style.scss";

const iconCheck = require("../../../public/assets/icon-check.svg");

export default function ConnectionSuccess(props) {
  const { setShow } = props;

  useEffect(() => {
    setTimeout(() => {
      setShow(() => false);
    }, 5000);
  }, []);

  return (
    <div id="connection-success">
      <img src={iconCheck} />
      <div>Connect Success</div>
    </div>
  );
}
