import { useEffect, useState } from "react";
import { getRoles } from "../../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Button } from "../dashboard/components/CustomUI";
import DataGrid from "react-data-grid";

const RolePage = () => {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = roles.filter((s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  const fetchRoles = async () => {
    try {
      const res = await getRoles();
      if (res.code === 0) {
        setRoles(res.data);
        setFilteredRoles(res.data);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  const columns = [
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        <Link
          to={`/user/roles/detail?id=${row.role_id}&name=${row.name}`}
          className="text-blue-600 hover:underline"
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "is_active",
      name: "Status",
      renderCell: ({ row }) => {
        const isActive = row.is_active; 

        return (
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-md ${
              isActive
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
    }
    // {
    //   key: "action",
    //   name: "Action",
    //   renderCell: ({ row }) => (
    //     <span className="flex gap-2">
    //       <Link to={`/organization/shift/edit?id=${row.id}`}>
    //         <Button variant="outline" size="sm">
    //           Edit
    //         </Button>
    //       </Link>
    //       <Button
    //         onClick={() => handleDeleteClick(row)}
    //         variant="destructive"
    //         size="sm"
    //       >
    //         Delete
    //       </Button>
    //     </span>
    //   ),
    // },
  ];

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">Roles</h3>
        <Link to="/user/roles/create">
          <Button
            //   onClick={() => setIsCreateModalOpen(true)}
            className="w-fit"
            variant="default"
          >
            Create Role
          </Button>
        </Link>
      </div>
      {/* Search Input for Filtering */}
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Search by shift name"
        className="w-full p-2 my-3 border border-gray-300 rounded-md"
      />
      <DataGrid
        className="rdg-light mt-3"
        columns={columns}
        rows={filteredRoles}
        rowKeyGetter={(row) => row.id}
      />
      {/* <DeleteModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    onConfirm={handleDeleteConfirm}
    department={selectedShift}
  /> */}
    </div>
  );
};

export default RolePage;
