import React from "react";
import Keyring from "@polkadot/keyring";
import { isKusamaAddress } from "../../utility";
import "./style.scss";

export default function AddressConverter() {
  const keyring = new Keyring();

  const convert = () => {
    const fromAddress = document.getElementById("from-address").value.trim();

    try {
      if (fromAddress != "") {
        document.getElementById("substrate-address").textContent = keyring.encodeAddress(
          fromAddress,
          42
        );

        document.getElementById("polkadot-address").textContent = keyring.encodeAddress(
          fromAddress,
          0
        );

        document.getElementById("kusama-address").textContent = keyring.encodeAddress(
          fromAddress,
          2
        );
      }

      document.getElementById("convert-error-message").style.display = "none";
    } catch {
      document.getElementById("convert-error-message").style.display =
      "inherit";
    }
  };
  return (
    <div id="address-converter">
      <div id="content">
        <div id="input-label">Enter an address</div>
        <input id="from-address" type="text" placeholder="address" />
        <div id="convert-error">
          <div id="convert-error-message">
            Invalid address, could not convert.
          </div>
        </div>
        <div className="button" onClick={() => convert()}>
          Convert
        </div>
        <div id="label">Polkadot Address</div>
        <div id="polkadot-address" className="output-address"></div>
        <div id="label">Kusama Address</div>
        <div id="kusama-address" className="output-address"></div>
        <div id="label">Substrate Address (used on Karura and Acala)</div>
        <div id="substrate-address" className="output-address"></div>
      </div>
    </div>
  );
}
