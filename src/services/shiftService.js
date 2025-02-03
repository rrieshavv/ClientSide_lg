import { apiClient } from "../providers/apiClient";

export const getAllShifts = async () => {
  try {
    return (await apiClient.get("/shift/get-all")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
