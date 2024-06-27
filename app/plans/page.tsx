"use client";
import React, { useState } from "react";
import PlanCard from "../components/plans/plancard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

function SelectedUserProfile() {
  // State for dialog visibility
  const [openAddPlan, setOpenAddPlan] = useState(false);
  // State for new plan details, adjusting for API requirements
  const [newPlanDetails, setNewPlanDetails] = useState({
    plan_name: "", // Changed from 'name' to 'plan_name' to match API requirements
    cost: "",
    description: "",
  });

  // Function to open the add plan dialog
  const handleOpenAddPlan = () => {
    setOpenAddPlan(true);
  };

  // Function to close the add plan dialog
  const handleCloseAddPlan = () => {
    setOpenAddPlan(false);
  };

  // Function to handle changes in the text fields within the dialog
  const handlePlanDetailChange = (event: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = event.target;
    setNewPlanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to submit the new plan to the backend via API
  const handleAddPlan = async () => {
    if (window.confirm("Are you sure you want to add this plan?")) {
      try {
        const response = await axios.post(
          "http://localhost:8090/api/v1/gym/plans/create",
          newPlanDetails
        );
        if (response.data.success) {
          alert("Plan added successfully.");
          handleCloseAddPlan();
          window.location.reload();
        } else {
          alert("Failed to add plan.");
        }
      } catch (error) {
        console.error("Failed to add plan:", error);
        alert("Failed to add plan.");
      }
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenAddPlan}>
        Add Plan
      </Button>
      <PlanCard
        name="Platinum"
        price="250"
        revenue="3209"
        percentage="67.9"
        activeUsers="87"
      />
      <PlanCard
        name="Gold"
        price="200"
        revenue="3209"
        percentage="67.9"
        activeUsers="87"
      />
      <PlanCard
        name="Silver"
        price="150"
        revenue="3209"
        percentage="67.9"
        activeUsers="87"
      />
      <Dialog open={openAddPlan} onClose={handleCloseAddPlan}>
        <DialogTitle>Add New Plan</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="plan_name"
            label="Plan Name"
            type="text"
            fullWidth
            name="plan_name"
            value={newPlanDetails.plan_name}
            onChange={handlePlanDetailChange}
          />
          <TextField
            margin="dense"
            id="cost"
            label="Plan cost"
            type="number"
            fullWidth
            name="cost"
            value={newPlanDetails.cost}
            onChange={handlePlanDetailChange}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            name="description"
            value={newPlanDetails.description}
            onChange={handlePlanDetailChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPlan}>Cancel</Button>
          <Button onClick={handleAddPlan} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SelectedUserProfile;
