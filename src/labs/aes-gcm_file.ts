import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { rmSync, type PathLike } from "node:fs";
import { generatePBKDF2Key } from "../encryption/key_derivation.ts";
import { Transform } from "node:stream";
import { createReadStream, createWriteStream, statSync } from "fs";
import { pipeline } from "node:stream/promises";

function createProgressTracker(totalBytes: number) {
  let processed = 0;
  let previousPercentage = -1;
  return new Transform({
    transform(chunk, _, callback) {
      processed += chunk.length;

      const percentage = Math.floor((processed / totalBytes) * 100);

      if (percentage !== previousPercentage) {
        previousPercentage = percentage;
        console.log(
          `Progress: ${percentage}% (${processed}/${totalBytes} bytes)`,
        );
      }

      callback(null, chunk);
    },
  });
}

export async function encryptFile(
  inputFilePath: PathLike,
  outputFilePath: PathLike,
  key: Buffer,
  algorithm: "aes-256-gcm",
) {
  const iv = Buffer.from(randomBytes(12));
  const cipher = createCipheriv(algorithm, key, iv);

  const { size } = statSync(inputFilePath);

  console.log(`Starting encryption of ${inputFilePath}...`);
  await pipeline(
    createReadStream(inputFilePath),
    createProgressTracker(size),
    cipher,
    createWriteStream(outputFilePath),
  );
  console.log(`Encryption completed. Encrypted file: ${outputFilePath}`);

  return { iv, authTag: Buffer.from(cipher.getAuthTag()) };
}

async function decryptFile(
  inputFilePath: PathLike,
  outputFilePath: PathLike,
  key: Buffer,
  algorithm: "aes-256-gcm",
  iv: Buffer,
  authTag: Buffer,
) {
  const decipher = createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);
  const { size } = statSync(inputFilePath);

  console.log(`Starting decryption of ${inputFilePath}...`);
  await pipeline(
    createReadStream(inputFilePath),
    createProgressTracker(size),
    decipher,
    createWriteStream(outputFilePath),
  );
  console.log(`Decryption completed. Decrypted file: ${outputFilePath}`);
}

if (import.meta.main) {
  const masterSecret = "my_super_secret_key";
  const keySalt = Buffer.from("63e9849131dc99e3f4feceb1");
  const pbkdf2Key = generatePBKDF2Key(masterSecret, keySalt);
  console.log("PBKDF2 Derived Key:", Buffer.from(pbkdf2Key).toString("hex"));

  // encrypt a sample file
  const filePath = "./.data/yellow_tripdata_2016-03.csv";
  const outputFilePath = "./.data/yellow_tripdata_2016-03.csv.enc";
  const { iv, authTag } = await encryptFile(
    filePath,
    outputFilePath,
    pbkdf2Key,
    "aes-256-gcm",
  );

  // decrypt the above file
  const encryptedFilePath = "./.data/yellow_tripdata_2016-03.csv.enc";
  const decryptedOutputFilePath =
    "./.data/yellow_tripdata_2016-03_decrypted.csv";

  await decryptFile(
    encryptedFilePath,
    decryptedOutputFilePath,
    pbkdf2Key,
    "aes-256-gcm",
    iv,
    authTag,
  );

  // Cleanup - remove the encrypted and decrypted files
  console.log(
    `Cleaning up temporary files...\n${outputFilePath}\n${decryptedOutputFilePath}`,
  );
  rmSync(outputFilePath);
  rmSync(decryptedOutputFilePath);
}
