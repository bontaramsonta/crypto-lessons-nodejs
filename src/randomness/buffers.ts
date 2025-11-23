// build a 12-byte (96-bit) nonce
// Bytes	Purpose                   Endian order
// 0-3	  Unix timestamp (seconds)	big-endian (so it sorts by time)
// 4-7	  Per-process counter	      little-endian (just to mix things up)
// 8-11	  4 random bytes	          raw bytes from crypto.randomBytes(4)

import { randomBytes } from "node:crypto";

function Counter() {
  let counter = 0;
  const getCounter = () => {
    return counter++;
  };
  return { getCounter };
}

const c = Counter();
console.log(c.getCounter());
console.log(c.getCounter());
