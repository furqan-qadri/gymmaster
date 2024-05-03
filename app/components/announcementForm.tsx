"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  TextField,
  Grid,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

interface FormData {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const AnnouncementForm = ({ onClose }: { onClose: () => void }) => {
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

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log("Form submitted:", data);
    setOpen(false);
    // Can perform further actions like API call here
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Announcement</DialogTitle>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Title"
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Content"
                  type="string"
                  {...register("content", {
                    required: "Content is required",
                  })}
                  error={!!errors.content}
                  helperText={errors.content?.message}
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

export default AnnouncementForm;
