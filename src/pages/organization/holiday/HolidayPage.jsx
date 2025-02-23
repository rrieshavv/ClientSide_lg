import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup } from "../../dashboard/components/CustomUI";
import { toast } from "react-toastify";
import { getAllFiscalYears } from "../../../services/miscService";
import {
  createNewHoliday,
  deleteHoliday,
  getHolidaysList,
} from "../../../services/holidayService";

import DataGrid from "react-data-grid";
import DeleteModal from "../../dashboard/components/CustomUI/DeleteModal";
import CreateHoliday from "./CreateHoliday";

const HolidayPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [fiscalYearList, setFiscalYearList] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchFiscalYears();
  }, []);

  useEffect(() => {
    if (fiscalYear) {
      fetchHolidays(fiscalYear);
    }
  }, [fiscalYear]);

  const fetchFiscalYears = async () => {
    try {
      const res = await getAllFiscalYears();

      if (res.code === 0) {
        setFiscalYearList(res.data);
        const currentYear = res.data.find((f) => f.is_current);
        setFiscalYear(
          currentYear ? currentYear.fiscal_year : res.data[0]?.fiscal_year || ""
        );
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Error fetching fiscal years");
    }
  };

  const handleDeleteClick = (holiday) => {
    setSelectedHoliday(holiday);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const res = await deleteHoliday(selectedHoliday.id);
    if (res.code === 0) {
      toast.success("Holiday deleted successfully!");
      setHolidays(
        holidays.filter((holiday) => holiday.id !== selectedHoliday.id)
      );
      setFilteredHolidays(
        filteredHolidays.filter((holiday) => holiday.id !== selectedHoliday.id)
      );
    } else {
      toast.error(res.message);
    }

    setIsModalOpen(false);
    setSelectedHoliday(null);
  };

  const fetchHolidays = async (fiscalYear) => {
    try {
      const res = await getHolidaysList(fiscalYear);
      if (res.code === 0) {
        setHolidays(res.data);
        setFilteredHolidays(res.data);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Error fetching holidays");
    }
  };

const handleCreateHoliday = async (formData) => {
  try{
    const res = await createNewHoliday(formData);
    if(res.code === 0){
      toast.success("Holiday created successfully!");
      fetchHolidays(fiscalYear);
    }else{
      toast.error(res.message);
    }
  }catch{
    toast.error("Failed to create holiday");
  }
}

  const handleFilterChange = (e) => {
    const searchText = e.target.value;
    setFilterText(searchText);

    const filtered = holidays.filter((s) =>
      s.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredHolidays(filtered);
  };

  const columns = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "fiscal_year",
      name: "Fiscal Year",
    },
    {
      key: "eng_date",
      name: "Date (AD)",
      render: (row) => row.eng_date.split("T")[0],
    },
    {
      key: "nep_date",
      name: "Date (BS)",
    },
    {
      key: "action",
      name: "Action",
      renderCell: ({ row }) => (
        <span className="flex gap-2">
          <Link to={`/organization/holiday/edit?id=${row.id}`}>
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
        <h3 className="my-3 font-semibold">Holiday</h3>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-fit"
            variant="default"
          >
            Create Holiday
          </Button>

      </div>

      {/* Search Input for Filtering */}
      <div className="grid grid-cols-2 gap-6 mt-6">
        <FormGroup>
          <label htmlFor="filterText" className="block text-sm font-medium">
            Search
          </label>
          <input
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            placeholder="Search by holiday name"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="fiscalYear" className="block text-sm font-medium">
            Fiscal Year
          </label>
          <select
            id="fiscalYear"
            name="fiscalYear"
            value={fiscalYear}
            onChange={(e) => setFiscalYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mt-2"
            disabled={fiscalYearList.length === 0}
          >
            {fiscalYearList.length === 0 ? (
              <option>Loading...</option>
            ) : (
              fiscalYearList.map((f) => (
                <option key={f.fiscal_year} value={f.fiscal_year}>
                  {f.fiscal_year}
                </option>
              ))
            )}
          </select>
        </FormGroup>
      </div>

      <DataGrid
        className="rdg-light mt-3"
        columns={columns}
        rows={filteredHolidays}
        rowKeyGetter={(row) => row.id}
      />

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        department={selectedHoliday}
      />

      <CreateHoliday
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        fiscalYearList={fiscalYearList}
        currentFY = {fiscalYear}
         onCreate={handleCreateHoliday}
      />
    </div>
  );
};

export default HolidayPage;
