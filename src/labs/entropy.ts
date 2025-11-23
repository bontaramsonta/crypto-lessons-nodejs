// 1. Spin up a new Node script.
// 2. Generate 100 000 random 16-byte buffers.
// 3. Convert each to base64url and push into a Set.
// 4. Log set.size at the end.

import { randomBytes } from "node:crypto";

function generateRandomUrls(n: number): Set<string> {
  const set: Set<string> = new Set();
  for (let i = 0; i < n; i++) {
    set.add(randomBytes(16).toString("base64url"));
  }
  return set;
}

const urls = generateRandomUrls(100_000);
console.log(urls.size);
