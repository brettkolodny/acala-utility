function isKusamaAddress(address) {
  const pattern = /^[A-Z]\w{46}/;

  return pattern.exec(address);
}

function isPolkadotAddress(address) {
  const pattern = /^1\w{46}/;

  return pattern.exec(address);
}

export { isKusamaAddress, isPolkadotAddress };
