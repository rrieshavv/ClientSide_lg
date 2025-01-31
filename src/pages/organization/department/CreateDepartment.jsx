import React, {useState} from "react";
import { toast } from "react-toastify";
import { Button } from "../../dashboard/components/CustomUI";

export const CreateDepartment = ({ isOpen, onClose, onCreate }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (departmentName.trim() === "") {
      toast.warn("Enter a department name!")
      return;
    }
    onCreate(departmentName, isActive);
    setDepartmentName("");
    setIsActive(true);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Create New Department</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="departmentName"
              className="block text-sm font-medium"
            >
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter department name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={isActive}
              onChange={(e) => setIsActive(e.target.value === "true")}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant = 'outline' onClick={onClose}>Cancel</Button>
            <Button type="submit">Submit</Button>           
          </div>
        </form>
      </div>
    </div>
  );
};
