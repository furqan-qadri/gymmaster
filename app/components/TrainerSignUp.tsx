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
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
} from "@mui/material";

interface FormData {
  full_name: string;
  sex: string;
  age: number;
  email_id: string;
  IC_Passport: string;
  phone: string;
  address: string;
}

const TrainerSignUp = ({ onClose }: { onClose: () => void }) => {
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
      // Prepare the payload
      const payload = {
        full_name: data.full_name,
        age: data.age,
        sex: data.sex,
        IC_Passport: data.IC_Passport,
        phone: data.phone,
        email_id: data.email_id,
        address: data.address,
      };

      // Make the POST request
      const response = await axios.post(
        "http://localhost:8090/api/v1/gym/trainers/create",
        payload
      );

      // If successful, log the response and close the modal
      console.log("Data stored in database:", response.data);
      setOpen(false);
      window.location.reload();
      onClose(); // Call the onClose function passed from the parent component
    } catch (error) {
      // If there's an error, log it and keep the modal open
      console.error("Error storing data:", error);
      // Optionally, you can show an error message to the user here
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Trainer</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register("full_name", { required: "Name is required" })}
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
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
                  {...register("email_id", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors.email_id}
                  helperText={errors.email_id?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IC/Passport"
                  type="text"
                  {...register("IC_Passport", {
                    required: "IC/Passport is required",
                    minLength: {
                      value: 7,
                      message: "IC/Passport must be at least 7 characters long",
                    },
                  })}
                  error={!!errors.IC_Passport}
                  helperText={errors.IC_Passport?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="tel"
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10,11}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
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

export default TrainerSignUp;
