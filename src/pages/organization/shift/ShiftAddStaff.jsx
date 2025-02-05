import { useState } from "react";
import SearchEmp from "../../dashboard/components/CustomForms/SearchEmp";
import { Button } from "../../dashboard/components/CustomUI";
import { toast } from "react-toastify";

const ShiftAddStaff = ({ isOpen, onClose, onAdd }) => {
  const [empId, setEmpId] = useState(""); // ✅ Store empId here

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!empId) {
      toast.warning("Please select an employee!");
      return;
    }
    onAdd(empId); // ✅ Send empId to parent
    setEmpId("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Add Employee</h3>
        <form onSubmit={handleSubmit}>
          <SearchEmp setEmpId={setEmpId} /> {/* ✅ Pass setEmpId to child */}
          <div className="mt-3 flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftAddStaff;
