import { apiClient } from "../providers/apiClient";

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
    throw error.response?.data?.message || "An error occurred";
  }
};

export const getDepartmentById = async (id) => {
  try {
    return (await apiClient.get(`/Department/get-department?id=${id}`)).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};

export const updateDepartment = async (
  departmentId,
  departmentName,
  isActive
) => {
  try {
    return (
      await apiClient.post(`/department/update`, {
        id: departmentId,
        isActive: isActive,
        name: departmentName,
      })
    ).data;
  } catch (error) {
    throw error.response?.data?.message || "An error occurred";
  }
};
