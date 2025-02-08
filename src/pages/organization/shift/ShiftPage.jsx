import "react-data-grid/lib/styles.css";
import { useEffect, useState } from "react";
import { deleteShift, getAllShifts } from "../../../services/shiftService";
import { toast } from "react-toastify";
import { Button } from "../../dashboard/components/CustomUI";
import DataGrid from "react-data-grid";
import { Link } from "react-router-dom";
import DeleteModal from "../../dashboard/components/CustomUI/DeleteModal";

const ShiftPage = () => {
  const [shifts, setShifts] = useState([]);
  const [filteredShifts, setFilteredShifts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    } catch {
      toast.error("Error loading shifts.");
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

  const handleDeleteClick = (shift) => {
    setSelectedShift(shift);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedShift) return;

    try {
      const response = await deleteShift(selectedShift.id);
      if (response.code === 0) {
        toast.success("Shift deleted successfully!");
        setShifts(shifts.filter((shift) => shift.id !== selectedShift.id));
        setFilteredShifts(
          filteredShifts.filter((shift) => shift.id !== selectedShift.id)
        );
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Failed to delete department.");
    }

    setIsModalOpen(false);
    setSelectedShift(null);
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
          <Link to={`/organization/shift/edit?id=${row.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => handleDeleteClick(row)}
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
        <Link to="/organization/shift/create">
          <Button
            //   onClick={() => setIsCreateModalOpen(true)}
            className="w-fit"
            variant="default"
          >
            Create Shift
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
        rows={filteredShifts}
        rowKeyGetter={(row) => row.id}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        department={selectedShift}
      />
    </div>
  );
};

export default ShiftPage;
