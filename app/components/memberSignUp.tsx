"use client";
import React from "react";
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
} from "@mui/material";

interface FormData {
  name: string;
  sex: string;
  age: number;
  email: string;
  phoneNumber: string;
}

const MemberSignUp = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log("Form submitted:", data);
    // You can perform further actions like API call here
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
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberSignUp;
function trigger(arg0: string): void {
  throw new Error("Function not implemented.");
}
