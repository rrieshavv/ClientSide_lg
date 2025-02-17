import { apiClient } from "../providers/apiClient";

export const getRoles = async () => {
  try {
    return (await apiClient.get("/user/get-roles")).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getRolePrivilegeDetail = async (id) => {
  try {
    return (await apiClient.get(`/user/Get-Role-Details?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const updateRolePrivilege = async (data) => {
  try {
    return (await apiClient.post("/user/assign-privilege", data)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const createRole = async (formData) =>{
  try {
    return (await apiClient.post("/user/create-role", formData)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
}
