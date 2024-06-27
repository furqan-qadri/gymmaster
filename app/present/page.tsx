"use client";
import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const AttendanceMarking = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/gym/members/getall"
        );
        if (response.data.success) {
          const formattedMembers = response.data.members.map(
            (member: { full_name: any; member_id: any }) => ({
              label: member.full_name, // Use full_name from the member object
              value: member.member_id, // Use member_id from the member object
            })
          );
          setMembers(formattedMembers);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleSubmit = () => {
    if (selectedMember) {
      console.log("Submitting for:", selectedMember.label);
      setIsSubmitting(true);

      const postData = {
        member_id: selectedMember.value,
        attendance_date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format
      };

      axios
        .post("http://localhost:8090/api/v1/gym/attendance/create", postData)
        .then((response) => {
          setIsSubmitting(false);
          setAttendanceMarked(true);
          console.log("Attendance marked:", response.data);
        })
        .catch((error) => {
          setIsSubmitting(false);
          console.error("Error marking attendance:", error);
          alert("Failed to mark attendance");
        });
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
          options={members}
          getOptionLabel={(option) => option.label}
          style={{ width: 300, backgroundColor: "white", marginBottom: "20px" }}
          renderInput={(params) => (
            <TextField {...params} label="Search your name" />
          )}
          value={selectedMember}
          onChange={(event, newValue) => setSelectedMember(newValue)}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedMember}
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
