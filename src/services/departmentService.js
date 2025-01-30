import axios from "axios";
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
    return (
      await apiClient.delete("/department", {
        deparmentId: id,
      })
    ).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const createDepartment = async ()=>{

}