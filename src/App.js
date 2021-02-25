import React, { useState, useEffect } from "react";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { types } from "@acala-network/types";
import AddressConverter from "./Components/AddressConverter";
import TokenLookup from "./Components/TokenLookup";

const acalaTypes = require("./types.json");

export default function App() {
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
  };

  useEffect(() => {
    connect();
  }, []);

  return (
    <div id="app">
      <AddressConverter />
      <TokenLookup api={api} />
    </div>
  );
}
