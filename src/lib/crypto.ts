enum KeyUsages {
  ENCRYPT = "encrypt",
  DECRYPT = "decrypt",
  SIGN = "sign",
  VERIFY = "verify",
  DERIVE_KEY = "deriveKey",
  DERIVE_BITS = "deriveBits",
  WRAP_KEY = "wrapKey",
  UNWRAP_KEY = "unwrapKey",
}

const enc = new TextEncoder();
const dec = new TextDecoder();

function bufferToBase64(buffer: any) {
  // TODO: rewrite
  return btoa(String.fromCharCode.apply(null, buffer));
}

function base64ToBuffer(text: string) {
  // TODO: rewrite
  return Uint8Array.from(atob(text), (c) => c.charCodeAt(0));
}

function getPasswordKey(password: string): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
}

function deriveKey(
  passwordKey: CryptoKey,
  salt: BufferSource,
  keyUsage: KeyUsages[],
) {
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 250000,
      hash: "SHA-256",
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    keyUsage,
  );
}

export async function encrypt(data: string, password: string): Promise<string> {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const initialVector = window.crypto.getRandomValues(new Uint8Array(12));
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, [KeyUsages.ENCRYPT]);
    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: initialVector,
      },
      aesKey,
      enc.encode(data),
    );

    const encryptedContentArray = new Uint8Array(encryptedContent);
    const buffer = new Uint8Array(
      salt.byteLength +
        initialVector.byteLength +
        encryptedContentArray.byteLength,
    );
    buffer.set(salt, 0);
    buffer.set(initialVector, salt.byteLength);
    buffer.set(
      encryptedContentArray,
      salt.byteLength + initialVector.byteLength,
    );

    return bufferToBase64(buffer);
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function decrypt(ciphertext: string, password: string) {
  try {
    const encryptedDataBuffer = base64ToBuffer(ciphertext);
    const salt = encryptedDataBuffer.slice(0, 16);
    const initialVector = encryptedDataBuffer.slice(16, 16 + 12);
    const data = encryptedDataBuffer.slice(16 + 12);
    const passwordKey = await getPasswordKey(password);
    const aesKey = await deriveKey(passwordKey, salt, [KeyUsages.DECRYPT]);
    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: initialVector,
      },
      aesKey,
      data,
    );
    return dec.decode(decryptedContent);
  } catch (e) {
    console.log(`Error - ${e}`);
    return "";
  }
}
