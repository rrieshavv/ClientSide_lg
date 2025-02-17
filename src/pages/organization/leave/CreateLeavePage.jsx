import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { validate as isValidUUID } from "uuid";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Button,
  Card,
  CardContent,
  FormGroup,
  Input,
  Label,
} from "../../dashboard/components/CustomUI";
import { useEffect, useState } from "react";
import {
  createLeave,
  getLeaveById,
  updateLeave,
} from "../../../services/leaveService";
import { toast } from "react-toastify";

const CreateLeavePage = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [title, setTitle] = useState("Create new leave");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    maxInMonth: 2,
    defaultdays: 1,
    isActive: "y",
  });

  useEffect(() => {
    if (id) {
      if (isValidUUID(id)) {
        getLeaveDetails(id);
      } else {
        toast.error("Invalid leave id");
      }
    }
  }, []);

  const getLeaveDetails = async (leaveid) => {
    setTitle("Edit leave");
    const data = await getLeaveById(leaveid);
    if (data.code === 0) {
      setFormData(data.data);
    } else {
      navigate.to("/organization/leave");
    }
  };

  const clearForm = () => {
    setFormData({
      name: "",
      maxInMonth: 2,
      defaultdays: 1,
      isActive: true,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (formData.maxInMonth < 1 || formData.maxInMonth > 100) {
      newErrors.maxInMonth = "Max in month must be between 1 and 100.";
    }

    if (formData.defaultdays < 1 || formData.defaultdays > 100) {
      newErrors.defaultdays = "Default days must be between 1 and 100.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setGeneralError("Please fix the errors in the form.");
      return;
    }

    try {
      if (id) {
        if (isValidUUID(id)) {
          const res = await updateLeave(formData);
          if (res.code === 0) {
            setSuccess("Leave updated successfully");
          } else {
            setGeneralError(res.message);
          }
          return;
        }
      }

      formData.id = uuidv4();
      const res = await createLeave(formData);
      if (res.code === 0) {
        setSuccess("Leave created successfully");
        clearForm();
      } else {
        setGeneralError(res.message);
      }
    } catch {
      setGeneralError("An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">{title}</h3>
        <Link to="/organization/leave">
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
            <div className="grid grid-cols-4 gap-6 mt-6">
              <FormGroup error={errors.name}>
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter leave name"
                  error={errors.name}
                  a
                />
              </FormGroup>
              <FormGroup error={errors.maxInMonth}>
                <Label htmlFor="maxInMonth" required>
                  Max allowed in a month
                </Label>
                <Input
                  id="maxInMonth"
                  name="maxInMonth"
                  value={formData.maxInMonth}
                  onChange={handleChange}
                  placeholder="Max leaves in a month"
                  error={errors.maxInMonth}
                  type="number"
                />
              </FormGroup>
              <FormGroup error={errors.defaultdays}>
                <Label htmlFor="defaultdays" required>
                  Total default days
                </Label>
                <Input
                  id="defaultdays"
                  name="defaultdays"
                  value={formData.defaultdays}
                  onChange={handleChange}
                  placeholder="Total default days"
                  error={errors.defaultdays}
                  type="number"
                />
              </FormGroup>
              <FormGroup error={errors.isActive}>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  id="isActive"
                  name="isActive"
                  value={formData.isActive.toString()}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                >
                  <option value={"y"}>Active</option>
                  <option value={"n"}>Inactive</option>
                </select>
              </FormGroup>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => clearForm()}
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

export default CreateLeavePage;
