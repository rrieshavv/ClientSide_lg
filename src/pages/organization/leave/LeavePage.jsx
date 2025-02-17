import { Link } from "react-router-dom";
import { Button } from "../../dashboard/components/CustomUI";
import { deleteLeave, getLeaves } from "../../../services/leaveService";
import { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import DeleteModal from "../../dashboard/components/CustomUI/DeleteModal";
import { toast } from "react-toastify";

const LeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await getLeaves();
    if (res.code === 0) {
      setLeaves(res.data);
      setFilteredLeaves(res.data);
    }
  };

  const handleDeleteClick = (leave) => {
    setSelectedLeave(leave);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const res = await deleteLeave(selectedLeave.id);
    if (res.code === 0) {
      toast.success("Leave deleted successfully!");
      setLeaves(leaves.filter((shift) => shift.id !== selectedLeave.id));
      setFilteredLeaves(
        filteredLeaves.filter((shift) => shift.id !== selectedLeave.id)
      );
    } else {
      toast.error(res.message);
    }

    setIsModalOpen(false);
    setSelectedLeave(null);
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = leaves.filter((s) =>
      s.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredLeaves(filtered);
  };

  const columns = [
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        <Link
          //   to={`/organization/shift/details?id=${row.id}`}
          className="text-blue-600 hover:underline"
        >
          {row.name}
        </Link>
      ),
    },
    {
      key: "isActive",
      name: "Status",
      renderCell: ({ row }) => {
        const isActive = row.isActive === "y"; // Assuming "y" means active

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
      key: "maxInMonth",
      name: "Max In Month",
    },
    {
      key: "defaultdays",
      name: "Default Days",
    },
    {
      key: "action",
      name: "Action",
      renderCell: ({ row }) => (
        <span className="flex gap-2">
          <Link to={`/organization/leave/edit?id=${row.id}`}>
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
        <h3 className="my-3 font-semibold">Leave</h3>
        <Link to="/organization/leave/create">
          <Button className="w-fit" variant="default">
            Create Leave
          </Button>
        </Link>
      </div>
      {/* Search Input for Filtering */}
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Search by leave name"
        className="w-full p-2 my-3 border border-gray-300 rounded-md"
      />
      <DataGrid
        className="rdg-light mt-3"
        columns={columns}
        rows={filteredLeaves}
        rowKeyGetter={(row) => row.id}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        department={selectedLeave}
      />
    </div>
  );
};

export default LeavePage;
