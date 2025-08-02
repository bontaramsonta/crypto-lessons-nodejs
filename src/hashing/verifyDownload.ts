import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";

export async function verifySHA256Checksum(
  filepath: string,
  filename: string,
  expectedChecksum: string,
): Promise<boolean> {
  const stream = createReadStream(path.join(path.resolve(filepath), filename));
  const readable = Readable.toWeb(stream);
  const hasher = createHash("sha256");
  for await (const chunk of readable) {
    hasher.update(chunk);
  }
  const hash = hasher.digest("hex");

  console.log("download hash:", hash);
  return hash == expectedChecksum;
}
