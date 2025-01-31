import { apiClient } from "../providers/apiClient";

// export const getRoles = async () => {
//   try {
//     const response = await axios.get(`${url}/user/get-roles`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error.response?.data?.message || "An error occurred";
//   }
// };

export const getRoles = async () => {
  try {
    return (await apiClient.get("/user/get-roles")).data;
  } catch (err) {
    throw err.response?.data?.message || "An error occurred";
  }
};

export const createUser = async (formData) => {
    try {
        
     return (await apiClient.post("/user/Create-User", {
       Username: formData.username,
       Password: formData.password,
       ConfirmPassword: formData.confirmPassword,
       Email: formData.email,
       Firstname: formData.firstname,
       Lastname: formData.lastname,
       Mobile: formData.mobile,
       RoleId: formData.roleId,
     })).data;
    } catch (err) {
      throw err.response?.data?.message || "An error occurred";
    }
  };
  