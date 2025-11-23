import { randomBytes } from "node:crypto";

const buf = randomBytes(16); // 16 bytes = 128 bits

console.log("hex:", buf.toString("hex"), buf.toString("hex").length);
console.log("base64:", buf.toString("base64"), buf.toString("base64").length);
console.log(
  "base64url:",
  buf.toString("base64url"),
  buf.toString("base64url").length,
);
