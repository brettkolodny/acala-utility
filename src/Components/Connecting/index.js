import React from "react";
import "./style.scss";

const loadingSvg = require("../../../public/assets/loading.svg");

export default function Connecting() {
  return (
    <div id="connecting">
      <div id="content">
        <img src={loadingSvg} />
      </div>
    </div>
  );
}
