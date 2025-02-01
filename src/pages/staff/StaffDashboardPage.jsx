import { useEffect, useState } from "react";
import { getStaffList } from "../../services/staffService";
import { toast } from "react-toastify";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

const StaffDashboardPage = () => {
  const [staffList, setStaffList] = useState([]);
  const [filteredStaffList, setFilteredStaffList] = useState([]);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    renderStaffList();
  }, []);

  const renderStaffList = async () => {
    try {
      const res = await getStaffList();
      if (res.code === 0) {
        setStaffList(res.data);
        setFilteredStaffList(res.data); // Initialize filtered list
      } else {
        toast.error("Could not fetch staff list.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching data.");
    }
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setFilterText(searchText);

    const filtered = staffList.filter(
      (staff) =>
        staff.firstname.toLowerCase().includes(searchText) ||
        staff.lastname.toLowerCase().includes(searchText) ||
        staff.designation.toLowerCase().includes(searchText)
    );

    setFilteredStaffList(filtered);
  };

  const columns = [
    {
      key: "firstname",
      name: "First Name",
      renderCell: ({ row }) => (
        <Link
          to={`/staff/profile?emp=${row.emp_id}`}
          className="text-blue-500 underline"
        >
          {row.firstname}
        </Link>
      ),
    },
    { key: "lastname", name: "Last Name" },
    { key: "level", name: "Level" },
    { key: "designation", name: "Designation" },
    { key: "email", name: "Email" },
    { key: "mobile", name: "Mobile" },

    // {
    //   key: "is_active",
    //   name: "Status",
    //   renderCell: ({ row }) => (
    //     <span
    //       className={`px-2 py-1 text-sm font-semibold rounded-md ${
    //         row.emp_status === "active"
    //           ? "bg-green-200 text-green-800"
    //           : "bg-red-200 text-red-800"
    //       }`}
    //     >
    //       {row.emp_status === "active" ? "Active" : "Inactive"}
    //     </span>
    //   ),
    // },
  ];

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">Staff Dashboard</h3>
        <input
          type="text"
          placeholder="Search staff..."
          value={filterText}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />
      </div>

      <DataGrid
        className="rdg-light mt-3"
        columns={columns}
        rows={filteredStaffList}
        rowKeyGetter={(row) => row.emp_id}
      />
    </div>
  );
};

export default StaffDashboardPage;
