const { cryptoWaitReady, blake2AsHex } = require('@polkadot/util-crypto')
const { ApiPromise } = require('@polkadot/api');

// generate call data
const genCallData = async (dest, value) => {
  await cryptoWaitReady();
  const api = await ApiPromise.create({});
  const tx = await api.tx.balances.transferKeepAlive(dest, value * 1000000000000000);
  let method = tx.method;
  console.log(method.toHuman())
  console.log(method.toHex())
  return method.toHex()
}

// generate call hash
const genCallHash = data => {
  return blake2AsHex(data)
}

const test = async () => {
  let bob = '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty';
  let value = 2;
  let callData = await genCallData(bob, value);
  let callHash = genCallHash(callData);
  console.log(callData);
  console.log(callHash);
  process.exit()
}

test()
