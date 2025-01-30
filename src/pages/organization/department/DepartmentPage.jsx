import "react-data-grid/lib/styles.css";
import React, { useEffect, useState } from "react";
import DataGrid from "react-data-grid";
import {
  getAllDepartments,
  deleteDepartment,
  createDepartment,
} from "../../../services/departmentService";
import { toast } from "react-toastify";
import DeleteModal from "../../dashboard/components/CustomUI/DeleteModal";
import { CreateDepartment } from "./CreateDepartment";
import { Button } from "../../dashboard/components/CustomUI";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      if (data.code === 0) {
        setDepartments(data.data);
        setFilteredDepartments(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleCreateDepartment = async (name, isActive) => {
    try {
      const response = await createDepartment({ name, is_active: isActive });
      if (response.code === 0) {
        toast.success("Department created successfully!");
        fetchDepartments(); // Re-fetch the department list to include the new department
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error creating department:", error);
      toast.error("Failed to create department.");
    }
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedDepartment) return;

    try {
      const response = await deleteDepartment(selectedDepartment.department_id);
      if (response.code === 0) {
        toast.success("Department deleted successfully!");
        setDepartments(
          departments.filter(
            (dept) => dept.department_id !== selectedDepartment.department_id
          )
        );
        setFilteredDepartments(
          filteredDepartments.filter(
            (dept) => dept.department_id !== selectedDepartment.department_id
          )
        ); // Remove from filtered list as well
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      toast.error("Failed to delete department.");
    }

    setIsModalOpen(false);
    setSelectedDepartment(null);
  };

  // Filtering Logic
  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    // Filter departments by name (case insensitive)
    const filtered = departments.filter((dept) =>
      dept.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDepartments(filtered);
  };

  const columns = [
    { key: "name", name: "Name" },
    {
      key: "is_active",
      name: "Status",
      renderCell: ({ row }) => (
        <span
          className={`px-2 py-1 text-sm font-semibold rounded-md ${
            row.is_active
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {row.is_active ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "action",
      name: "Action",
      renderCell: ({ row }) => (
        <span className="flex gap-2">
          <Button
            onClick={() => handleDeleteClick(row)}
            variant="outline"
            size="sm"
          >
            Edit
          </Button>
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
        <h3 className="my-3 font-semibold">Departments</h3>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-red-400 p-2 rounded-md w-fit"
        >
          Create department
        </button>
      </div>

      {/* Search Input for Filtering */}
      <input
        type="text"
        value={filterText}
        onChange={handleFilterChange}
        placeholder="Search by department name"
        className="w-full p-2 my-3 border border-gray-300 rounded-md"
      />

      <DataGrid
        className="rdg-light mt-3"
        columns={columns}
        rows={filteredDepartments} // Display filtered departments
        rowKeyGetter={(row) => row.department_id}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        department={selectedDepartment}
      />

      <CreateDepartment
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateDepartment}
      />
    </div>
  );
};

export default DepartmentPage;
