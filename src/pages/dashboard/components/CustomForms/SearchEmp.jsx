import { useEffect, useState } from "react";
import { Input } from "../CustomUI";
import { searchStaff } from "../../../../services/staffService";

const SearchEmp = ({ setEmpId }) => {
  const [target, setTarget] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);


  const search = async (targetValue) => {
    setEmpId("");
    setTarget(targetValue);
    if (targetValue.trim() !== "") {
      try {
        const res = await searchStaff(targetValue);
        setResults(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.log(err);
      }
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  return (
    <div>
      <Input
        value={target}
        onChange={(e) => search(e.target.value)}
        name="empName"
        id="empName"
        placeholder="Search staff"
        className="w-full"
        autoComplete="off"
      />
      {showDropdown && results.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-48 z-10">
          {results.map((emp) => (
            <li
              key={emp.empId}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setTarget(emp.name);
                setEmpId(emp.empId); // ✅ Update empId in parent (ShiftAddStaff)
                setShowDropdown(false);
              }}
            >
              {emp.name} - {emp.designation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchEmp;
