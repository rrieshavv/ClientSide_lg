import axios from "axios";
import { getBackendUrl } from "../providers/Helper";

const url = getBackendUrl();

export const loginService = async (username, password) => {
  try {
    const response = await axios.post(`${url}/connect/Login`, {
      username,
      password,
      userAgent: "string",
      ipAddress: "string",
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const forgetPasswordService = async (user_name) => {
  try {
    const response = await axios.get(`${url}/connect/forget-password`, {
      params: {
        username: user_name,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
