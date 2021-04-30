function isKusamaAddress(address) {
  const pattern = /^[A-Z]/;

  return pattern.exec(address);
}

function isPolkadotAddress(address) {
  const pattern = /^1/;

  return pattern.exec(address);
}

function isSubstrateAddress(address) {
  const pattern = /^5/;

  return pattern.exec(address);
}


export { isKusamaAddress, isPolkadotAddress, isSubstrateAddress };
