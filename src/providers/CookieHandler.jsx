import Cookies from "js-cookie";

// Set token and username in the cookie with encryption
export const setToken = (token, sessionId, navMenu) => {
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

  // Cookies.set("menu", JSON.stringify(navMenu),{
  //   expires: 0.02,
  //   secure: true,
  //   sameSite: "strict"
  // })

  localStorage.setItem("menu", JSON.stringify(navMenu));
};

export const getToken = () => {
  const encryptedCookie = Cookies.get("authToken");
  if (encryptedCookie) {
    return encryptedCookie;
  }
  return null;
};

export const getMenu = () => {
  const storedMenu = localStorage.getItem("menu");
  if (storedMenu) {
    return JSON.parse(storedMenu); 
  } 
  return null;
};

export const removeToken = () => {
  Cookies.remove("authToken");
  Cookies.remove("session");
  Cookies.remove("menu");
};
