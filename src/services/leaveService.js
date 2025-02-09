import { apiClient } from "../providers/apiClient";

export const getLeaves = async () => {
  try {
    return (await apiClient.get("/leave/get-all")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const createLeave = async (formData) => {
  try {
    

    return (await apiClient.post("/leave/create", formData)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const updateLeave = async (formData) => {
  try {
    return (await apiClient.post("/leave/update", formData)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
}

export const getLeaveById = async (id) => {
  try {
    return (await apiClient.get(`/leave/get-by-id?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
}

export const deleteLeave = async (id) => {
  try{
    return (await apiClient.post(`/leave/delete?id=${id}`)).data;
  }catch(error){
    throw error.response?.data?.message || "An error occurred";
  }
}