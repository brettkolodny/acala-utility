function isKusamaAddress(address) {
  const pattern = /^[A-Z]\w{46}/;

  return pattern.exec(address);
}

export { isKusamaAddress };
