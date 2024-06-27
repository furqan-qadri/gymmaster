"use client";
import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

const AttendanceMarking = () => {
  const [selectedName, setSelectedName] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  const names = [
    { label: "John Doe", value: 1 },
    { label: "Jane Smith", value: 2 },
    { label: "Alice Johnson", value: 3 },
    { label: "Robert Brown", value: 4 },
    { label: "Emily Davis", value: 5 },
  ];

  const handleSubmit = () => {
    if (selectedName) {
      console.log("Submitting for:", selectedName.label);
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setAttendanceMarked(true);
      }, 2000);
    }
  };

  if (attendanceMarked) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <h1>Attendance marked for today!</h1>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        padding="20px"
        borderRadius="8px"
        maxWidth="450px"
        width="100%"
        textAlign="center"
        bgcolor="background.paper"
        style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)" }}
      >
        <h1>Welcome to the Gym</h1>
        <p style={{ fontStyle: "italic" }}>
          Please mark your attendance. Make sure you have given location
          permission to this tab.
        </p>
        <Autocomplete
          options={names}
          getOptionLabel={(option) => option.label}
          style={{ width: 300, backgroundColor: "white", marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search your name" />
          )}
          value={selectedName}
          onChange={(event, newValue) => setSelectedName(newValue)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedName}
          style={{ padding: "10px 20px", fontSize: "18px", color: "white" }}
        >
          {isSubmitting ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            "Submit"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default AttendanceMarking;
