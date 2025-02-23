import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "../../dashboard/components/CustomUI";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";

const CreateHoliday = ({
  isOpen,
  onClose,
  onCreate,
  fiscalYearList,
  currentFY,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    fiscal_year: currentFY || "",
    eng_date: "",
    nep_date: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, fiscal_year: currentFY }));
  }, [currentFY]);

  const handleChange = (e) => {
    const { name, value } = e.target ? e.target : e;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warn("Enter a title!");
      return;
    }
    if (!formData.eng_date.trim()) {
      toast.warn("Enter a date!");
      return;
    }
    if (!formData.nep_date.trim()) {
      toast.warn("Enter Nepali date!");
      return;
    }
    if (!formData.fiscal_year.trim()) {
      toast.warn("Select a fiscal year!");
      return;
    }

    onCreate(formData);

    setFormData({
      title: "",
      fiscal_year: currentFY || "",
      eng_date: "",
      nep_date: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h3 className="text-xl font-semibold mb-4">Create New Holiday</h3>
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              placeholder="Enter holiday name"
            />
          </div>

          {/* Date (AD) Input */}
          <div className="mb-4">
            <label htmlFor="eng_date" className="block text-sm font-medium">
              Date (AD)
            </label>
            <input
              type="date"
              id="eng_date"
              name="eng_date"
              value={formData.eng_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            />
          </div>

          {/* Nepali Date Input */}
          <div className="mb-4">
            <label htmlFor="nep_date" className="block text-sm font-medium">
              मिति (Nepali Date)
            </label>
            {/* <input
              type="date"
              id="nep_date"
              name="nep_date"
              value={formData.nep_date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
            /> */}
            <NepaliDatePicker
              inputClassName="form-control w-full p-2 border border-gray-300 rounded-md mt-2"
              options={{ calenderLocale: "en", valueLocale: "en" }}
              className=""
              value={formData.nep_date}
              onChange={(value) => handleChange({ name: "nep_date", value })}
              name="nep_date"
              id="nep_date"
            />
          </div>

          {/* Fiscal Year Dropdown */}
          <div className="mb-4">
            <label htmlFor="fiscal_year" className="block text-sm font-medium">
              Fiscal Year
            </label>
            <select
              id="fiscal_year"
              name="fiscal_year"
              value={formData.fiscal_year}
              onChange={handleChange}
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
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHoliday;
