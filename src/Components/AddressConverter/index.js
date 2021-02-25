import React from "react";
import Keyring from "@polkadot/keyring";
import "./style.scss";

export default function AddressConverter() {
  const keyring = new Keyring();

  const convert = () => {
    const fromAddress = document.getElementById("from-address").value.trim();
    try {
      document.getElementById(
        "output-address"
      ).innerHTML = keyring.encodeAddress(fromAddress, 42);
    } catch {}
  };
  return (
    <div id="address-converter">
      <div id="content">
        <div id="label">Kusama Address</div>
        <input id="from-address" type="text" placeholder="address" />
        <div className="button" onClick={() => convert()}>
          Convert
        </div>
        <div id="label">Acala Address</div>
        <div id="output-address"></div>
      </div>
    </div>
  );
}
