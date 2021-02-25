import React, { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { types } from "@acala-network/types";
import AddressConverter from "./Components/AddressConverter";
import TokenLookup from "./Components/TokenLookup";
import Connecting from "./Components/Connecting";
import ConnectionSuccess from "./Components/ConnectionSuccess";

export default function App() {
  const [connecting, setConnecting] = useState(true);
  const [showConnSuccess, setShowConnSuccess] = useState(false);
  const [api, setApi] = useState(null);

  const connect = async () => {
    const wsProvider = new WsProvider(
      "wss://node-6714447553211260928.rz.onfinality.io/ws"
    );
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: types,
    });

    setApi(api);
    setConnecting(false);
    setShowConnSuccess(true);
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div id="app">
      {connecting ? <Connecting /> : null}
      {showConnSuccess ? (
        <ConnectionSuccess setShow={setShowConnSuccess} />
      ) : null}
      {connecting ? null : (
        <div id="app-content">
          <AddressConverter />
          <TokenLookup api={api} />
        </div>
      )}
    </div>
  );
}
