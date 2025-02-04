import { Link, useNavigate } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormGroup,
  Input,
  Label,
} from "../../dashboard/components/CustomUI";
import { useState } from "react";
import { createNewShift } from "../../../services/shiftService";
import { toast } from "react-toastify";

const ShiftCreatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    isdisabled: "n",
    sundayin: "09:00",
    sundayout: "18:00",
    mondayin: "09:00",
    mondayout: "18:00",
    tuesdayin: "09:00",
    tuesdayout: "18:00",
    wednesdayin: "09:00",
    wednesdayout: "18:00",
    thursdayin: "09:00",
    thursdayout: "18:00",
    fridayin: "09:00",
    fridayout: "18:00",
    saturdayin: "09:00",
    saturdayout: "18:00",
    issundayoff: false,
    ismondayoff: false,
    istuesdayoff: false,
    iswednesdayoff: false,
    isthursdayoff: false,
    isfridayoff: false,
    issaturdayoff: false,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ].forEach((day) => {
      if (!formData[`is${day}off`]) {
        const inTime = formData[`${day}in`];
        const outTime = formData[`${day}out`];

        if (!inTime) {
          newErrors[`${day}in`] = "In time is required";
        }
        if (!outTime) {
          newErrors[`${day}out`] = "Out time is required";
        }

        if (inTime && outTime) {
          if (inTime >= outTime) {
            newErrors[`${day}in`] = "In time must be earlier than out time";
            newErrors[`${day}out`] = "Out time must be later than in time";
          }
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccess("");

    if (!validateForm()) {
      setGeneralError("Please fix the errors in the form.");
      return;
    }

    const modifiedFormData = { ...formData };

    // Convert off fields to 'y' or 'n'
    [
      "issundayoff",
      "ismondayoff",
      "istuesdayoff",
      "iswednesdayoff",
      "isthursdayoff",
      "isfridayoff",
      "issaturdayoff",
    ].forEach((day) => {
      modifiedFormData[day] = modifiedFormData[day] ? "y" : "n";
    });

    // Convert time fields to time-only format (HH:mm:ss) for C# TimeOnly
    [
      "sundayin",
      "sundayout",
      "mondayin",
      "mondayout",
      "tuesdayin",
      "tuesdayout",
      "wednesdayin",
      "wednesdayout",
      "thursdayin",
      "thursdayout",
      "fridayin",
      "fridayout",
      "saturdayin",
      "saturdayout",
    ].forEach((field) => {
      if (modifiedFormData[field]) {
        const [hours, minutes] = modifiedFormData[field].split(":");
        modifiedFormData[field] = `${hours.padStart(2, "0")}:${minutes.padStart(
          2,
          "0"
        )}:00`; // Add seconds
      }
    });

    try {
      const res = await createNewShift(modifiedFormData);
      if (res.code === 0) {
        toast.success(res.message);
        navigate('/organization/shift')
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred.");
    }
    console.log("valid", modifiedFormData);
  };

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">Create new shift</h3>
        <Link to="/organization/shift">
          <Button className="w-fit" variant="outline">
            Back
          </Button>
        </Link>
      </div>
      <Card className="w-full mt-3 mr-3">
        <CardContent>
          {generalError && (
            <Alert variant="error" className="mb-6">
              {generalError}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="mb-6">
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <FormGroup error={errors.name}>
              <Label htmlFor="name" required>
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter shift name"
                error={errors.name}
              />
            </FormGroup>

            <div className="grid grid-cols-3 gap-6 mt-6">
              {[
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
              ].map((day) => (
                <div key={day} className="flex flex-col gap-2">
                  <Label>{day.charAt(0).toUpperCase() + day.slice(1)}</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="time"
                      name={`${day}in`}
                      value={formData[`${day}in`]}
                      onChange={handleChange}
                      disabled={formData[`is${day}off`]}
                      error={errors[`${day}in`]}
                    />
                    <Input
                      type="time"
                      name={`${day}out`}
                      value={formData[`${day}out`]}
                      onChange={handleChange}
                      disabled={formData[`is${day}off`]}
                      error={errors[`${day}out`]}
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name={`is${day}off`}
                      checked={formData[`is${day}off`]}
                      onChange={handleChange}
                    />
                    <span>Day Off</span>
                  </label>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                // onClick={() => clearForm()}
              >
                Clear
              </Button>
              <Button type="submit">Confirm</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShiftCreatePage;
