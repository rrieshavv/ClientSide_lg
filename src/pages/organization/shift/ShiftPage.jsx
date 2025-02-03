import "react-data-grid/lib/styles.css";
import { useEffect, useState } from "react";
import { getAllShifts } from "../../../services/shiftService";
import { toast } from "react-toastify";
import { Button } from "../../dashboard/components/CustomUI";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";

const ShiftPage = () => {
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedShifts, setSelectedShifts] = useState(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const data = await getAllShifts();
      if (data.code === 0) {
        setShifts(data.data);
        setFilteredShifts(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error loading shifts.");
      //   console.error("Error fetching departments:", error);
    }
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = shifts.filter((s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredShifts(filtered);
  };

  const columns = [
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        <Link
          to={`/organization/shift/details?id=${row.id}`}
          className="text-blue-600 hover:underline"
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "isDisabled",
      name: "Status",
      renderCell: ({ row }) => {
        const isActive = row.isDisabled === "n"; // Assuming "n" means active

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
    },
    {
      key: "action",
      name: "Action",
      renderCell: ({ row }) => (
        <span className="flex gap-2">
          <Button
            //   onClick={() => handleEditClick(row)}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
          <Button
            //   onClick={() => handleDeleteClick(row)}
            variant="destructive"
            size="sm"
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">Shifts</h3>
        <Button
          //   onClick={() => setIsCreateModalOpen(true)}
          className="w-fit"
          variant="default"
        >
          Create Shift
        </Button>
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
        rows={filteredShifts}
        rowKeyGetter={(row) => row.id}
      />
      
    </div>
  );
};

export default ShiftPage;
