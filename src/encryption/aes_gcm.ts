import { randomBytes, createCipheriv, createDecipheriv } from "node:crypto";

import { generateDerivedKey } from "./key_derivation.ts";

export function aesGCMEncrypt(payload: Buffer, key: Buffer) {
  const iv = randomBytes(12); // 96-bit nonce for AES-GCM

  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(payload), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return { iv, ciphertext, authTag };
}

export function aesGCMDecrypt(
  encryptedData: {
    iv: Buffer;
    ciphertext: Buffer;
    authTag: Buffer;
  },
  key: Buffer,
) {
  const { iv, ciphertext, authTag } = encryptedData;

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);
  const decryptedPayload = Buffer.concat([
    decipher.update(ciphertext),
    decipher.final(),
  ]);
  return decryptedPayload;
}

if (import.meta.main) {
  // Derive a key using HKDF
  const masterSecret = "my_super_secret_key";
  const keySalt = Buffer.from("some salt");
  const aesEncryptionKey = generateDerivedKey(masterSecret, keySalt, "enc");

  console.log(
    "HKDF Derived Key:",
    Buffer.from(aesEncryptionKey).toString("hex"),
  );

  // Encrypt a sample payload
  const payload = Buffer.from("This is a secret message.");
  const { iv, ciphertext, authTag } = aesGCMEncrypt(payload, aesEncryptionKey);

  console.log("AES-GCM Encrypted Payload:", {
    iv: iv.toString("hex"),
    ciphertext: ciphertext.toString("hex"),
    authTag: authTag.toString("hex"),
  });

  // Decrypt the sample payload
  const decryptedPayload = aesGCMDecrypt(
    { iv, ciphertext, authTag },
    aesEncryptionKey,
  );
  console.log("AES-GCM Decrypted Payload:", decryptedPayload.toString());
}
