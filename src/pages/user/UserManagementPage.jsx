import React from "react";
import { NavLink } from "react-router-dom";

const UserManagementPage = () => {
  return (
    <div>
      <h3 className="my-3 font-semibold">User Management Page</h3>
      <NavLink to="/user/create" className="bg-red-400  p-2 rounded-md">
        Create new user
      </NavLink>
    </div>
  );
};

export default UserManagementPage;
