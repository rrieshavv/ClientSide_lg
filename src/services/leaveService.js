import { apiClient } from "../providers/apiClient";

export const getLeaves = async () => {
  try {
    return (await apiClient.get("/leave/get-all")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
