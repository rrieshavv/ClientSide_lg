import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getShiftDetails } from "../../../services/shiftService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShiftDetailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const shiftId = searchParams.get("id");

  const [shift, setShift] = useState({});

  useEffect(() => {
    fetchShiftDetails();
  }, []);

  const fetchShiftDetails = async () => {
    try {
      const res = await getShiftDetails(shiftId);
      if (res.code === 0) {
        setShift(res.data);
      } else {
        toast.error(res.message);
        navigate("/organization/shift");
      }
    } catch {
      toast.error("Error occurred.");
      navigate("/organization/shift");
    }
  };

  const columns = [
    { key: "day", name: "Day" },
    { key: "inTime", name: "In Time" },
    { key: "outTime", name: "Out Time" },
    {
      key: "isOff",
      name: "Day Off",
      renderCell: ({ row }) => {
        const isActive = row.isOff === "y"; // Assuming "n" means active

        return (
          <span
            className={`px-2 py-1 text-sm font-semibold rounded-md ${
              !isActive
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {isActive ? "Weekly Off" : "Working Day"}
          </span>
        );
      },
    },
  ];

  const rows = [
    {
      day: "Sunday",
      inTime: shift.sundayin,
      outTime: shift.sundayout,
      isOff: shift.issundayoff,
    },
    {
      day: "Monday",
      inTime: shift.mondayin,
      outTime: shift.mondayout,
      isOff: shift.ismondayoff,
    },
    {
      day: "Tuesday",
      inTime: shift.tuesdayin,
      outTime: shift.tuesdayout,
      isOff: shift.istuesdayoff,
    },
    {
      day: "Wednesday",
      inTime: shift.wednesdayin,
      outTime: shift.wednesdayout,
      isOff: shift.iswednesdayoff,
    },
    {
      day: "Thursday",
      inTime: shift.thursdayin,
      outTime: shift.thursdayout,
      isOff: shift.isthursdayoff,
    },
    {
      day: "Friday",
      inTime: shift.fridayin,
      outTime: shift.fridayout,
      isOff: shift.isfridayoff,
    },
    {
      day: "Saturday",
      inTime: shift.saturdayin,
      outTime: shift.saturdayout,
      isOff: shift.issaturdayoff,
    },
  ];
  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">
          <Link
            to="/organization/shift"
            className="text-blue-600 hover:underline"
          >
            Shift:
          </Link>{" "}
          {shift.name?.toUpperCase()}
        </h3>
      </div>

      {/* Wrapper with full height */}
      <div className="w-full h-[400px] mt-3">
        <DataGrid 
          className="rdg-light"
          columns={columns}
          rows={rows}
          rowHeight={40} 
        />
      </div>
    </div>
  );
};

export default ShiftDetailPage;
