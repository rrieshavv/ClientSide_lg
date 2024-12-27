import CryptoJS from "crypto-js";

const secret_key = import.meta.env.VITE_ENCRYPTION_SECRET_KEY;

// Encrypt data
export const encryptData = (data) => {
  console.log(secret_key)
  return CryptoJS.AES.encrypt(JSON.stringify(data), secret_key).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret_key);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : null;
};