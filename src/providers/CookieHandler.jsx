import Cookies from "js-cookie";
import { decryptData, encryptData } from "./Encryptor";

// Set token and username in the cookie with encryption
export const setToken = (token, username) => {
  const data = {
    token,
    username,
  };

  const encryptedData = encryptData(data);

  Cookies.set("authToken", encryptedData, {
    expires: 0.002, 
    secure: true,
    sameSite: "strict",
  });
};

export const getToken = () => {
  const encryptedCookie = Cookies.get("authToken");
  if (encryptedCookie) {
    return decryptData(encryptedCookie); 
  }
  return null;
};

export const removeToken = () => {
  Cookies.remove("authToken");
};
