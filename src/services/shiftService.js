import { apiClient } from "../providers/apiClient";

export const getAllShifts = async () => {
  try {
    return (await apiClient.get("/shift/get-all")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getShiftDetails = async (id) => {
  try {
    return (await apiClient.get(`/shift/get-shift?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getStaffInShift = async (id) => {
  try {
    return (await apiClient.get(`/shift/emp-in-shift?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const createNewShift = async (formData) => {
  try {
    return (await apiClient.post("/shift/create", formData)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const deleteShift = async (id) => {
  try {
    return (await apiClient.post(`/shift/delete?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const editShift = async (formData) =>{
  try {
    return (await apiClient.post("/shift/update", formData)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
}

