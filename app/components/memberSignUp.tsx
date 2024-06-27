"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
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
  TextareaAutosize,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  // DatePicker,
} from "@mui/material";

interface FormData {
  name: string;
  sex: string;
  age: number;
  email: string;
  icPassport: string;
  phoneNumber: string;
  activeStatus: string;
  address: string;
  signUpDate: string;
  plan?: string;
  trainer?: string;
}

const MemberSignUp = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = useState(true); // Dialog is open by default

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose function passed from the parent component
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const formattedSignUpDate = new Date().toISOString().split("T")[0];
      // Prepare the payload
      const payload = {
        full_name: data.name,
        age: data.age,
        sex: data.sex,
        IC_Passport: data.icPassport,
        phone: data.phoneNumber,
        email_id: data.email,
        address: data.address,
        sign_up_date: "2024-06-28", // Current date
        plan_id: data.plan, // Assuming plan is the plan_id
        trainer_id: data.trainer, // Assuming trainer is the trainer_id
      };

      // Make the POST request
      const response = await axios.post(
        "http://localhost:8090/api/v1/gym/members/create",
        payload
      );
      alert("Member added successfully");
      // console.log("Data stored in database:", response.data);
      setOpen(false);
      onClose();
      window.location.reload(); // Call the onClose function passed from the parent component
    } catch (error) {
      // If there's an error, log it and keep the modal open
      console.error("Error storing data:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add member</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.sex}>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    defaultValue={"Male"}
                    {...register("sex", { required: "Sex is required" })}
                    error={!!errors.sex}
                    label="Sex"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                  <FormHelperText>{errors.sex?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 18, message: "Age must be at least 18" },
                  })}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IC/Passport"
                  type="text" // Change type to "text"
                  {...register("icPassport", {
                    required: "IC/Passport is required",
                    minLength: {
                      value: 7,
                      message: "IC/Passport must be at least 7 characters long",
                    },
                  })}
                  error={!!errors.icPassport}
                  helperText={errors.icPassport?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              </Grid>
              {/* Additional Fields */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.activeStatus}>
                  <InputLabel>Active Status</InputLabel>
                  <Select
                    defaultValue={"Active"}
                    {...register("activeStatus", {
                      required: "Active status is required",
                    })}
                    error={!!errors.activeStatus}
                    label="Active Status"
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.activeStatus?.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Address"
                  {...register("address", { required: "Address is required" })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.plan}>
                  <InputLabel>Plan</InputLabel>
                  <Select
                    {...register("plan", { required: "Plan is required" })}
                    error={!!errors.plan}
                    label="Plan"
                  >
                    <MenuItem value="">Select Plan</MenuItem>
                    <MenuItem value="2">Platinum</MenuItem>
                    <MenuItem value="1">Gold</MenuItem>
                    <MenuItem value="9">Silver</MenuItem>
                  </Select>
                  <FormHelperText>{errors.plan?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.trainer}>
                  <InputLabel>Trainer</InputLabel>
                  <Select
                    {...register("trainer", {
                      required: "Trainer is required",
                    })}
                    error={!!errors.trainer}
                    label="Trainer"
                  >
                    <MenuItem value="">Select Trainer</MenuItem>
                    <MenuItem value="4">John Doe</MenuItem>
                    <MenuItem value="4">Jane Smith</MenuItem>
                    <MenuItem value="4">Sam Wilson</MenuItem>
                  </Select>
                  <FormHelperText>{errors.trainer?.message}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default MemberSignUp;
