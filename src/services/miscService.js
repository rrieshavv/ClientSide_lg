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

export const getAllFiscalYears = async () => {
  try {
    return (await apiClient.get("/settings/Get-All-Fiscal-Year")).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const getCurrentFiscalYear = async () => {
  try {
    return (await apiClient.get("/settings/Get-Current-Fiscal-Year")).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
}