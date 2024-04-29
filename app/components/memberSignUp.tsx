"use client";
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Box,
  FormHelperText,
} from "@mui/material";
import toast from "react-hot-toast";

const validateEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone: number) => {
  const re = /^\d{10,11}$/;
  return re.test(phone);
};

interface FormData {
  name: string;
  sex: string;
  phoneNumber: number;
  email: string;
  address: string;
  age: string;
  status: string;
  signUpDate: string;
  plan: string;
  trainer: string;
}

const MemberSignUp = ({ onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    sex: "Male",
    phoneNumber: "",
    email: "",
    identitynumber: "",
    address: "",
    age: "",
    status: "Active",
    signUpDate: "",
    plan: "",
    trainer: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event: {
    target: { name: string | number; value: any };
  }) => {
    const { name, value } = event.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate email in real time
    if (name === "email") {
      const emailError = validateEmail(value) ? null : "Invalid email address";
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }));
    } else {
      // Clear other errors if any
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: null,
        }));
      }
    }

    if (name === "age") {
      const ageValue = Number(value);
      const ageError =
        ageValue < 5 || ageValue > 150 ? "Enter appropriate age" : null;
      setErrors((prev) => ({
        ...prev,
        age: ageError,
      }));
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    toast.success("Member added successfully");
    event.preventDefault();
    const newErrors = {};

    // Required fields validation
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else {
      const ageValue = Number(formData.age);
      if (ageValue < 5 || ageValue > 150) {
        newErrors.age = "Enter appropriate age";
      }
    }
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!validatePhone(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number, must be 10 digits";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.age) newErrors.age = "Age is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.signUpDate) newErrors.signUpDate = "Sign up date is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form Data Submitted:", formData);
    }
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <h1 className="text-2xl font-bold my-2">ADD MEMBER</h1>
        <h1 className="mb-6 italic">
          Please enter the information of the gym member in the respective
          fields.{" "}
        </h1>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            error={!!errors.name}
            helperText={errors.name}
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!errors.sex}>
            <InputLabel>Sex</InputLabel>
            <Select
              name="sex"
              value={formData.sex}
              label="Sex"
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            {errors.sex && <FormHelperText>{errors.sex}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            error={!!errors.identitynumber}
            helperText={errors.identitynumber}
            label="IC/Passport"
            name="identitynumber"
            value={formData.identitynumber}
            onChange={handleChange}
            sx={{ marginBottom: "15px" }}
          />

          <TextField
            fullWidth
            required
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={formData.phoneNumber}
            onChange={handleChange}
            inputProps={{
              inputMode: "numeric", // Ensures a numeric keyboard on mobile devices
              pattern: "[0-9]*", // Restricts input to digits only
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
            label="Email ID"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            error={!!errors.age}
            helperText={errors.age}
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            inputProps={{
              min: 5,
              max: 150,
            }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            error={!!errors.signUpDate}
            helperText={errors.signUpDate}
            label="Sign Up Date"
            name="signUpDate"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formData.signUpDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Plan</InputLabel>
            <Select
              name="plan"
              value={formData.plan}
              label="Plan"
              onChange={handleChange}
            >
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Trainer</InputLabel>
            <Select
              name="trainer"
              value={formData.trainer}
              label="Trainer"
              onChange={handleChange}
            >
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Smith">Jane Smith</MenuItem>
              <MenuItem value="Sam Wilson">Sam Wilson</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <div className="w-full">
          <div className="flex gap-2 items-end justify-end mt-5">
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

export default MemberSignUp;
