import axios, { isAxiosError } from "axios";
import { getBackendUrl } from "../providers/Helper";
import { apiClient } from "../providers/apiClient";

const url = getBackendUrl();

export const getAllDepartments = async () => {
  try {
    return (await apiClient.get("/department/get-all-departments")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const deleteDepartment = async (id) => {
  try {
    return (await apiClient.post(`/department/delete?departmentId=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const createDepartment = async (Name, IsActive) => {
  try {
    const dto = {
      name: Name, 
      is_active: IsActive,
    };
    return (await apiClient.post(`/department/create`, dto)).data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error.response?.data?.message || "An error occurred";
  }
};

