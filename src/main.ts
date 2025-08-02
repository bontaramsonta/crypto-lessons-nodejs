import { createHash, getHashes } from "node:crypto";
import { verifySHA256Checksum } from "./hashing/verifyDownload.ts";

export function checkHashingAlgo(algorihm: string) {
  const algos = getHashes();
  return algos.includes(algorihm);
}

export function createCommitHash() {
  if (!checkHashingAlgo("sha1")) {
    return null;
  }
  const hasher = createHash("sha1");
  hasher.update("Hello world");
  return hasher.digest("hex");
}

const filepath = "./.data";
const filename = "mantra.jpg";

const result = await verifySHA256Checksum(
  filepath,
  filename,
  "d6c1a023251f13b7c167c7e578cc1fce367f461f105878cb71363156d6ea6381",
);
console.log(result);
