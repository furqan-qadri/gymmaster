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
import axios from "axios";

interface FormData {
  title: string;
  content: string;
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
    onClose();
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    console.log("Form submitted:", data);

    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/gym/announcements/create",
        data
      );
      if (response.data.success) {
        alert("Announcement created successfully!");
        window.location.reload(); // Refresh the page
      } else {
        alert("Failed to create announcement.");
        setOpen(true); // Reopen the dialog if needed
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred while creating the announcement.");
      setOpen(true); // Reopen the dialog if there's an error
    }
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
                  {...register("content", { required: "Content is required" })}
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
