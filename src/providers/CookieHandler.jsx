import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

// Secret key for encryption/decryption (You should keep this safe and not expose it in the client-side code)
const SECRET_KEY = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

// Encrypt data
const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : null;
};

// Set token and username in the cookie with encryption
export const setToken = (token, username) => {
  const data = {
    token,
    username,
  };

  const encryptedData = encryptData(data);
  
  Cookies.set("authToken", encryptedData, {
    expires: 0.002, // 30 minutes
    secure: true,
    sameSite: "strict",
  });
};

// Get token and username from the cookie with decryption
export const getToken = () => {
  const encryptedCookie = Cookies.get("authToken");
  if (encryptedCookie) {
    return decryptData(encryptedCookie); // Returns { token, username }
  }
  return null;
};

// Remove the token cookie
export const removeToken = () => {
  Cookies.remove("authToken");
};
