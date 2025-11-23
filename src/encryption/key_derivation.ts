import { hkdfSync, pbkdf2Sync, randomBytes } from "node:crypto";

export function generateDerivedKey(
  masterSecret: string,
  keySalt: Buffer,
  purpose: "enc" | "sig" | "hash",
) {
  const ikm = Buffer.from(masterSecret);
  const info = Buffer.from(purpose);
  const keyLength = 32; // desired length of the derived key in bytes

  const derivedKey = hkdfSync("sha256", ikm, keySalt, info, keyLength);
  return Buffer.from(derivedKey);
}

export function generatePBKDF2Key(masterSecret: string, keySalt: Buffer) {
  const password = Buffer.from(masterSecret);
  const iterations = 100000; // number of iterations
  const keyLength = 32; // desired length of the derived key in bytes

  const derivedKey = pbkdf2Sync(
    password,
    keySalt,
    iterations,
    keyLength,
    "sha256",
  );
  return Buffer.from(derivedKey);
}

// Example usage
if (import.meta.main) {
  const masterSecret = "my_super_secret_key";
  const saltStr = "some salt";
  const keySalt = saltStr ? Buffer.from(saltStr) : randomBytes(16);
  console.log("Key Salt:", keySalt.toString("hex"));
  const derivedKey = generateDerivedKey(masterSecret, keySalt, "enc");
  console.log("HKDF Derived Key:", Buffer.from(derivedKey).toString("hex"));

  const pbkdf2Key = generatePBKDF2Key(masterSecret, keySalt);
  console.log("PBKDF2 Derived Key:", Buffer.from(pbkdf2Key).toString("hex"));
}
