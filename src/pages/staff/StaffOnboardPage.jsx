import { useState, useEffect } from "react";
import { getDesignations, getLevels } from "../../services/miscService";
import { getAllDepartments } from "../../services/departmentService";
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Select,
} from "../dashboard/components/CustomUI";
import { onboardStaff } from "../../services/staffService";

const StaffOnboardPage = () => {
  const [formData, setFormData] = useState({
    department_id: "",
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    designation: "",
    level: "",
    address: "",
    dob: "",
    joining_date: "",
    phone: "",
    middlename: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [levels, setLevels] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levelList = await getLevels();
        if (levelList.code === 0) {
          setLevels(levelList.data);
        } else {
          throw new Error("Cannot load levels.");
        }
      } catch (err) {
        setGeneralError(err.message || "Failed to fetch levels");
      }
    };

    const fetchDesignations = async () => {
      try {
        const designationList = await getDesignations();
        if (designationList.code === 0) {
          setDesignations(designationList.data);
        } else {
          throw new Error("Cannot load designations.");
        }
      } catch (err) {
        setGeneralError(err.message || "Failed to fetch designations");
      }
    };

    const fetchDepartments = async () => {
      try {
        const departmentList = await getAllDepartments();
        if (departmentList.code === 0) {
          setDepartments(departmentList.data);
        } else {
          throw new Error("Cannot load designations.");
        }
      } catch (err) {
        setGeneralError(err.message || "Failed to fetch designations");
      }
    };

    fetchDepartments();
    fetchLevels();
    fetchDesignations();
  }, []);

  const clearForm = () => {
    setFormData({
      department_id: "",
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      designation: "",
      level: "",
      address: "",
      dob: "",
      joining_date: "",
      phone: "",
      middlename: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!formData.department_id) {
      newErrors.department_id = "Department selection is required.";
    }

    if (!formData.designation) {
      newErrors.designation = "Designation selection is required.";
    }

    if (!formData.level) {
      newErrors.level = "Level selection is required.";
    }

    if (!formData.firstname) {
      newErrors.firstname = "Firstname is required.";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Lastname is required.";
    }

    if (!formData.address) {
      newErrors.address = "Address is required.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    }

    if (!formData.joining_date) {
      newErrors.joining_date = "Joining date is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccess("");

    if (!validateForm()) {
      setGeneralError("Please fix the errors in the form.");
      return;
    }

    try {
      const res = await onboardStaff(formData);

      if (res.code === 0) {
        setSuccess(res.message);
        clearForm();
      } else {
        setGeneralError(res.message);
      }
    } catch (err) {
      setGeneralError(err);
    }
  };

  return (
    <Card className="w-full mt-3 mr-3">
      <CardHeader>
        <CardTitle>Onboard new staff</CardTitle>
      </CardHeader>
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
          <div className="grid grid-cols-3 gap-6">
            <FormGroup error={errors.firstname}>
              <Label htmlFor="firstname" required>
                First Name
              </Label>
              <Input
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Enter first name"
                error={errors.firstname}
              />
            </FormGroup>
            <FormGroup error={errors.middlename}>
              <Label htmlFor="middlename">Middle Name</Label>
              <Input
                id="middlename"
                name="middlename"
                value={formData.middlename}
                onChange={handleChange}
                placeholder="Enter middle name"
                error={errors.middlename}
              />
            </FormGroup>
            <FormGroup error={errors.lastname}>
              <Label htmlFor="lastname" required>
                Last Name
              </Label>
              <Input
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Enter last name"
                error={errors.lastname}
              />
            </FormGroup>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <FormGroup error={errors.email}>
              <Label htmlFor="email" required>
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                error={errors.email}
              />
            </FormGroup>
            <FormGroup error={errors.mobile}>
              <Label htmlFor="mobile" required>
                Mobile Number
              </Label>
              <Input
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                error={errors.mobile}
              />
            </FormGroup>
            <FormGroup error={errors.phone}>
              <Label htmlFor="phone">Phone </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone "
                error={errors.phone}
              />
            </FormGroup>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <FormGroup error={errors.address}>
              <Label htmlFor="address" required>
                Address
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                error={errors.address}
              />
            </FormGroup>
            <FormGroup error={errors.dob}>
              <Label htmlFor="dob" required>
                Date Of Birth (AD)
              </Label>
              <Input
                id="dob"
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                error={errors.dob}
              />
            </FormGroup>
            <FormGroup error={errors.joining_date}>
              <Label htmlFor="joining_date" required>
                Joining Date (AD)
              </Label>
              <Input
                id="joining_date"
                name="joining_date"
                type="date"
                value={formData.joining_date}
                onChange={handleChange}
                error={errors.joining_date}
              />
            </FormGroup>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <FormGroup>
              <Label htmlFor="department_id">Department</Label>
              <Select
                id="department_id"
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a department
                </option>
                {departments.map((department) => (
                  <option
                    key={department.department_id}
                    value={department.department_id}
                  >
                    {department.name}
                  </option>
                ))}
              </Select>
              {errors.department_id && (
                <p className="text-red-500">{errors.department_id}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="designation">Designation</Label>
              <Select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a designation
                </option>
                {designations.map((designation) => (
                  <option key={designation.val1} value={designation.val1}>
                    {designation.val1}
                  </option>
                ))}
              </Select>
              {errors.designation && (
                <p className="text-red-500">{errors.designation}</p>
              )}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="designation">Level</Label>
              <Select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a level
                </option>
                {levels.map((level) => (
                  <option key={level.val1} value={level.val1}>
                    {level.val1}
                  </option>
                ))}
              </Select>
              {errors.level && <p className="text-red-500">{errors.level}</p>}
            </FormGroup>
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <Button type="button" variant="outline" onClick={() => clearForm()}>
              Clear
            </Button>
            <Button type="submit">Confirm</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StaffOnboardPage;
