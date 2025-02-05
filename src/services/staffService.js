import { apiClient } from "../providers/apiClient";

export const onboardStaff = async (formData) => {
  try {
    return (
      await apiClient.post("/Employee/create-employee", {
        department_id: formData.department_id,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        mobile: formData.mobile,
        designation: formData.designation,
        level: formData.level,
        address: formData.address,
        dob: formData.dob,
        joining_date: formData.joining_date,
        phone: formData.phone,
        middlename: formData.middlename,
      })
    ).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const getStaffDetails = async (id) => {
  try {
    return (await apiClient.get(`/employee/get-emp-details?id=${id}`)).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const getStaffList = async () => {
  try {
    return (await apiClient.get(`/employee/get-emp-list`)).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const searchStaff = async (param) => {
  try {
    return (await apiClient.get(`/Employee/search-emp?param=${param}`)).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const addStaffToShift=async(empId, shiftId)=>{
  try {
    return (await apiClient.post(`/shift/add-emp-to-shift?empId=${empId}&shiftId=${shiftId}`)).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
}