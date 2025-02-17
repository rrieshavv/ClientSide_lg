import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  FormGroup,
  Input,
  Label,
} from "../dashboard/components/CustomUI";
import { useState } from "react";
import { toast } from "react-toastify";
import { createRole } from "../../services/rolesService";

const CreateRole = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    isActive: true,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const res = await createRole(formData);
      if (res.code === 0) {
        toast.success(res.message);
        navigate("/users/roles");
      } else {
        toast.error(res.message);
        return;
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="w-full m-3">
      <div className="flex justify-between items-center w-full">
        <h3 className="my-3 font-semibold">Create role</h3>
        <Link to="/users/roles">
          <Button className="w-fit" variant="outline">
            Back
          </Button>
        </Link>
      </div>
      <Card className="w-full mt-3 mr-3">
        <CardContent>
          {/* {generalError && (
          <Alert variant="error" className="mb-6">
            {generalError}
          </Alert>
        )}
        {success && (
          <Alert variant="success" className="mb-6">
            {success}
          </Alert>
        )} */}
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
                  placeholder="Enter role name"
                  error={errors.name}
                  a
                />
              </FormGroup>

              <FormGroup error={errors.isActive}>
                <label htmlFor="status" className="block text-sm font-medium">
                  Status
                </label>
                <select
                  id="isActive"
                  name="isActive"
                  value={formData.isActive}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </FormGroup>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <Button type="submit">Confirm</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateRole;
