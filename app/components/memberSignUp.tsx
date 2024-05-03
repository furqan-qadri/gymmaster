"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  // DatePicker,
} from "@mui/material";

interface FormData {
  name: string;
  sex: string;
  age: number;
  email: string;
  phoneNumber: string;
  activeStatus: string;
  address: string;
  signUpDate: Date;
  plan?: string;
  trainer?: string;
}

const MemberSignUp = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log("Form submitted:", data);
    setOpen(false);
    onClose();
    // Can perform further actions like API call here
  };
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    onClose(); // Call the onClose function passed from the parent component
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
            <FormHelperText>{errors.activeStatus?.message}</FormHelperText>
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
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Premium">Premium</MenuItem>
              <MenuItem value="VIP">VIP</MenuItem>
            </Select>
            <FormHelperText>{errors.plan?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!errors.trainer}>
            <InputLabel>Trainer</InputLabel>
            <Select
              {...register("trainer", { required: "Trainer is required" })}
              error={!!errors.trainer}
              label="Trainer"
            >
              <MenuItem value="">Select Trainer</MenuItem>
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Smith">Jane Smith</MenuItem>
              <MenuItem value="Sam Wilson">Sam Wilson</MenuItem>
            </Select>
            <FormHelperText>{errors.trainer?.message}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberSignUp;
