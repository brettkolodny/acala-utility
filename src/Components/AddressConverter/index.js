import React from "react";
import Keyring from "@polkadot/keyring";
import { isKusamaAddress } from "../../utility";
import "./style.scss";

export default function AddressConverter() {
  const keyring = new Keyring();

  const convert = () => {
    const fromAddress = document.getElementById("from-address").value.trim();

    const toAddress = document.getElementById("output-address").value.trim();

    if (!isKusamaAddress(fromAddress) && fromAddress != "") {
      document.getElementById("convert-error-message").style.display =
        "inherit";
      return;
    } else {
      document.getElementById("convert-error-message").style.display = "none";
    }

    try {
      if (fromAddress != "") {
        document.getElementById("output-address").value = keyring.encodeAddress(
          fromAddress,
          42
        );
      } else {
        document.getElementById("from-address").value = keyring.encodeAddress(
          toAddress,
          2
        );
      }
    } catch {}
  };
  return (
    <div id="address-converter">
      <div id="content">
        <div id="label">Kusama Address</div>
        <input id="from-address" type="text" placeholder="address" />
        <div id="convert-error">
          <div id="convert-error-message">
            Invalid address, is it a Kusama address?
          </div>
        </div>
        <div className="button" onClick={() => convert()}>
          Convert
        </div>
        <div id="label">Substrate Address</div>
        <input id="output-address" type="text" placeholder="address"></input>
      </div>
    </div>
  );
}
