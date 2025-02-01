import { apiClient } from "../providers/apiClient";

export const getLevels = async () => {
  try {
    return (await apiClient.get("/Settings/Get-Static-Values?id=2")).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};


export const getDesignations = async () => {
    try {
      return (await apiClient.get("/Settings/Get-Static-Values?id=1")).data;
    } catch (err) {
      throw err.response?.data?.message || "An error occurred";
    }
  };