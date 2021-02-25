import React, { useState } from "react";
import Keyring from "@polkadot/keyring";
import { isKusamaAddress } from "../../utility";
import "./style.scss";

function formatToken(token, tokenType) {
  if (token == 0) {
    return `0 ${tokenType}`;
  }

  const [tokenAmount, tokenSymbol] = token.split(" ");

  if (tokenSymbol.charAt(0) == "k") {
    return `${tokenAmount} k${tokenType}`;
  } else {
    return `${tokenAmount} ${tokenType}`;
  }
}

export default function TokenLookup(props) {
  const { api } = props;
  const keyring = new Keyring();

  const [aca, setACA] = useState(null);
  const [kar, setKAR] = useState(null);

  const lookupTokens = async () => {
    const kusamaAddress = document.getElementById("address").value;

    if (!isKusamaAddress(kusamaAddress)) {
      document.getElementById("lookup-error-message").style.display = "inherit";
      return;
    } else {
      document.getElementById("lookup-error-message").style.display = "none";
    }

    let address;
    try {
      address = keyring.encodeAddress(kusamaAddress, 42);
    } catch {}

    let acaToken = await api.query.airDrop.airDrops(address, "ACA");
    if (acaToken == "0") {
    }
    let karToken = await api.query.airDrop.airDrops(address, "KAR");

    setACA(() => formatToken(acaToken.toHuman(), "ACA"));
    setKAR(() => formatToken(karToken.toHuman(), "KAR"));
  };

  return (
    <div id="token-lookup">
      <div id="content">
        <div id="label">Kusama Address</div>
        <input id="address" type="text" placeholder="address" />
        <div id="lookup-error">
          <div id="lookup-error-message">
            Invalid address, is it a Kusama address?
          </div>
        </div>
        <div className="button" onClick={() => lookupTokens()}>
          Lookup
        </div>
        <div id="tokens">
          {aca ? (
            <div className="token">{aca}</div>
          ) : (
            <div className="token muted">0.0 ACA</div>
          )}
          {kar ? (
            <div className="token">{kar}</div>
          ) : (
            <div className="token muted">0.0 KAR</div>
          )}
        </div>
      </div>
    </div>
  );
}
