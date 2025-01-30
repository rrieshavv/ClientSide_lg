import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";
import { NavLink } from "react-router-dom";

const UserManagementPage = () => {
  const columns = [
    { key: "id", name: "ID" },
    { key: "title", name: "Title" },
  ];  

  const rows = [
    { id: 0, title: "Example" },
    { id: 1, title: "Demo" },
  ];
  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">User Management Page</h3>
        <NavLink to="/user/create" className="bg-red-400 p-2 rounded-md w-fit">
          Create new user
        </NavLink>
      </div>
      <DataGrid className="rdg-light" columns={columns} rows={rows} />
    </div>
  );
};

export default UserManagementPage;
