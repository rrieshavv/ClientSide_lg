import "react-data-grid/lib/styles.css";
import { useEffect, useState } from "react";
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
import EditDepartment from "./EditDepartment";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      const response = await createDepartment(name, isActive);
      if (response.code === 0) {
        toast.success("Department created successfully!");
        fetchDepartments(); // Re-fetch the department list to include the new department
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Failed to create department.");
    }
  };

  const handleEditClick = (department) => {
    setSelectedDepartment(department);
    setIsEditModalOpen(true);
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
        setDepartments(departments.filter((dept) => dept.department_id !== selectedDepartment.department_id));
        setFilteredDepartments(filteredDepartments.filter((dept) => dept.department_id !== selectedDepartment.department_id));
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

  const handleEditDepartment = (departmentId, name, isActive) => {
    setDepartments(departments.map(department =>
      department.department_id === departmentId
        ? { ...department, name, is_active: isActive }
        : department
    ));
    setFilteredDepartments(filteredDepartments.map(department =>
      department.department_id === departmentId
        ? { ...department, name, is_active: isActive }
        : department
    ));
  };

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

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
            onClick={() => handleEditClick(row)}
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
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-fit"
          variant="default"
        >
          Create department
        </Button>
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
        rows={filteredDepartments}
        rowKeyGetter={(row) => row.department_id}
      />

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

      <EditDepartment
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        departmentId={selectedDepartment?.department_id}
        onUpdate={handleEditDepartment}
      />
    </div>
  );
};

export default DepartmentPage;
