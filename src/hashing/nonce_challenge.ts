// build a 12-byte (96-bit) nonce
// Bytes	Purpose                   Endian order
// 0-3	  Unix timestamp (seconds)	big-endian (so it sorts by time)
// 4-7	  Per-process counter	      little-endian (just to mix things up)
// 8-11	  4 random bytes	          raw bytes from crypto.randomBytes(4)

import { randomBytes } from "node:crypto";

function Counter() {
  let counter = 0;
  const getCounter = () => {
    console.log("got counter value:", counter);
    return counter++;
  };
  return { getCounter };
}

function getUnixTimestampInSeconds() {
  const unixTimestampInSeconds = Math.floor(Date.now() / 1000); // seconds since epoch
  console.log("unix timestamp:", unixTimestampInSeconds);
  return unixTimestampInSeconds;
}

const c = Counter();

function buildNonce() {
  const nonce = Buffer.alloc(12);

  // 0-3: Unix timestamp (seconds) big-endian
  const unixTimestampInSeconds = getUnixTimestampInSeconds();
  nonce.writeUInt32BE(unixTimestampInSeconds, 0);

  // 4-7: Per-process counter little-endian
  const counterValue = c.getCounter();
  nonce.writeUInt32LE(counterValue, 4);

  // 8-11: 4 random bytes
  const randomBytesBuffer = randomBytes(4);
  randomBytesBuffer.copy(nonce, 8);

  console.log("nonce:", nonce.toString("hex"));
  return nonce;
}

for (let i = 0; i < 5; i++) {
  buildNonce();
}
