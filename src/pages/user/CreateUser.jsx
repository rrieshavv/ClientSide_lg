import React, { useState, useEffect } from "react";
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
} from "../dashboard/components/CustomUI/index";
import { createUser, getRoles } from "../../services/userService";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    roleId: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const roles = async () => {
      try {
        const roles = await getRoles();
        setRoles(roles.data);
      } catch (err) {
        setGeneralError(err || "Failed to fetch roles");
      }
    };

    roles();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Mobile validation
    const mobileRegex = /^\d{10}$/;
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.roleId) {
      newErrors.roleId = "Role selection is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");
    setSuccess("");

    if (!validateForm()) {
      setGeneralError("Please fix the errors in the form");
      return;
    }

    try {
      const res = await createUser(formData);

      if (res.code === 0) {
        setSuccess(res.message);
        
        //Reset form
        setFormData({
          username: "",
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          roleId: "",
        });
      } else {
        setGeneralError(res.message);
      }
    } catch (err) {
      // console.log(err)
      setGeneralError(err);
    }
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
  return (
    <Card className="w-full mt-3 mr-3">
      <CardHeader>
        <CardTitle>Create New User</CardTitle>
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
          <div className="grid grid-cols-2 gap-6">
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

            <FormGroup error={errors.username}>
              <Label htmlFor="username" required>
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                error={errors.username}
              />
            </FormGroup>

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

            <FormGroup error={errors.password}>
              <Label htmlFor="password" required>
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                error={errors.password}
              />
            </FormGroup>

            <FormGroup error={errors.confirmPassword}>
              <Label htmlFor="confirmPassword" required>
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                error={errors.confirmPassword}
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

            <FormGroup>
              <Label htmlFor="roles">Roles</Label>
              <Select
                id="roleId"
                name="roleId"
                value={formData.roleId}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role) => (
                  <option key={role.role_id} value={role.role_id}>
                    {role.name}
                  </option>
                ))}
              </Select>
              {errors.roleId && <p className="text-red-500">{errors.roleId}</p>}
            </FormGroup>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Create User</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateUser;
