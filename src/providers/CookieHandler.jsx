import Cookies from "js-cookie";

// Set token and username in the cookie with encryption
export const setToken = (token, sessionId) => {
  Cookies.set("authToken", token, {
    expires: 0.02, 
    secure: true,
    sameSite: "strict",
  });

  Cookies.set("session", sessionId, {
    expires: 0.02, 
    secure: true,
    sameSite: "strict",
  });
};

export const getToken = () => {
  const encryptedCookie = Cookies.get("authToken");
  if (encryptedCookie) {
    // return decryptData(encryptedCookie); 
    return encryptedCookie;
  }
  return null;
};

export const removeToken = () => {
  Cookies.remove("authToken");
};
