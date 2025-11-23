# 8-Week Node.js Cryptography Study Plan  
*A hands-on, code-first progression from fundamentals to building secure real-world crypto utilities in Node.js.*

---

## Week 1 – Randomness & Encoding Fundamentals
**Concepts**
- Entropy, pseudo-randomness, CSPRNGs  
- OS RNG vs `Math.random()`  
- Nonces, IVs, uniqueness requirements  
- Encodings: UTF-8, hex, Base64, Base64URL  
- Buffers and byte-level manipulation  
- Endianness basics

**Hands-on Tasks**
- Generate random bytes, ints, UUIDs  
- Create nonce generator (96-bit GCM style)  
- Convert between encodings using Buffers  
- Validate randomness distribution visually (simple histograms)  
- Write helpers for hex ↔ buffer, b64 ↔ buffer

---

## Week 2 – Hashing & Message Digests  
**Concepts**
- One-way functions  
- Pre-image, second pre-image, collision resistance  
- SHA-256 / SHA-512 / BLAKE2b  
- Streaming vs one-shot hashing  
- HMAC (construction and purpose)

**Hands-on Tasks**
- Implement file hashing CLI  
- Create HMAC-based token signer/verifier  
- Benchmark different hash algorithms  
- Explore collisions via birthday paradox intuition

---

## Week 3 – Symmetric Cryptography  
**Concepts**
- AES basics  
- Modes: GCM, CTR, CBC (and why CBC is mostly obsolete)  
- Authenticated encryption vs “encrypt-then-MAC”  
- Key sizes, IV/nonce requirements  
- Streaming encryption

**Hands-on Tasks**
- Implement AES-GCM encrypt/decrypt utility  
- Handle nonces safely  
- Implement streaming AES encryption for large files  
- Add progress reporting with `pipeline()`

---

## Week 4 – Key Derivation, Password Hashing & Secrets  
**Concepts**
- PBKDF2, scrypt, Argon2  
- Salts, peppers  
- Key stretching  
- Deriving encryption keys from passwords  
- Secure secret storage

**Hands-on Tasks**
- Build password hashing helper with scrypt  
- Derive AES key from a user password  
- Create encrypted `.env` loader (simple secrets vault)  
- Understand timing attacks & constant-time comparison

---

## Week 5 – Public-Key Cryptography  
**Concepts**
- RSA vs ECDSA vs Ed25519  
- Public/private keypairs  
- Digital signatures & verification  
- Key formats: PEM, DER, JWK  
- Hybrid encryption (ECDH + symmetric)

**Hands-on Tasks**
- Generate RSA & EC keys  
- Sign & verify data with Node crypto  
- Convert keys across PEM/DER/JWK  
- Build simple hybrid encryption flow

---

## Week 6 – TLS, Certificates & PKI  
**Concepts**
- X.509 certificates  
- CA, chain of trust  
- CSR generation  
- TLS handshake basics  
- MITM attacks and certificate pinning

**Hands-on Tasks**
- Generate self-signed certificates  
- Create CSR and sign with your own mini-CA  
- Start an HTTPS server with your cert  
- Implement certificate pinning in a Node client

---

## Week 7 – Secure Protocol Design & Implementation  
**Concepts**
- Replays, reflection attacks  
- Nonce misuse resistance  
- Session keys, forward secrecy  
- Key rotation  
- Error-handling pitfalls (decrypt-oracle issues)

**Hands-on Tasks**
- Implement mini encrypted messaging protocol  
- Add timestamps + nonces to prevent replay  
- Add key rotation (manual + automated)  
- Build tamper-resistant error handling

---

## Week 8 – Capstone Project: Build a Secure Node.js Crypto Toolkit  
**Deliverables**
- A CLI + Node library containing:
  - Randomness helpers  
  - Encoding/conversion utilities  
  - AES-GCM encryption/decryption  
  - Password hashing  
  - Keypair generation & signatures  
  - Hybrid encryption  
  - Simple certificate utilities  
- Documentation + examples  
- Security notes: threat model, misuse cases, limitations

**Final Goal**  
A professional-quality, well-documented crypto utility toolkit demonstrating mastery of Node.js cryptography fundamentals and practical secure design.

---
