import React, { useState } from "react";
import Keyring from "@polkadot/keyring";
import "./style.scss";

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
    let karToken = await api.query.airDrop.airDrops(address, "KAR");

    setACA(() => acaToken.toHuman());
    setKAR(() => karToken.toHuman());
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
