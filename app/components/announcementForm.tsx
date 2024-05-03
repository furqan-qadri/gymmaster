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
  InputLabel,
} from "@mui/material";

interface FormData {
  id: string;
  title: string;
  content: string;
  date: Date;
}

const AnnouncementForm = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [open, setOpen] = useState(true); // Dialog is open by default

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FormData> = (data: any) => {
    console.log("Form submitted:", data);
    console.log("hello");
    // setOpen(false);
    // Can perform further actions like API call here
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Create Announcement</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AnnouncementForm;
