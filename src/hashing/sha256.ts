import { createHash } from "node:crypto";

function sha256(data: string) {
  return createHash("sha256").update(data).digest("hex");
}

const msg1 = "hello world";
const msg2 = "hello worle"; // one-letter change

console.log("msg1:", sha256(msg1));
console.log("msg2:", sha256(msg2));
