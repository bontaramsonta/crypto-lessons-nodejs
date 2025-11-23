import { randomBytes } from "node:crypto";

export function freshNonce(len = 12) {
  return randomBytes(len);
}

const n1 = freshNonce(12);
const n2 = freshNonce(12);
console.log(n1.toString("hex"));
console.log(n2.toString("hex"));
