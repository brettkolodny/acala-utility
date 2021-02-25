import React, { useState } from "react";
import Keyring from "@polkadot/keyring";
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
    const address = keyring.encodeAddress(
      document.getElementById("address").value,
      42
    );

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
