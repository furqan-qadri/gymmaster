"use client";
import React, { useState, useEffect, useMemo } from "react";
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

interface Plan {
  plan_id: number;
  plan_name: string;
  cost: string;
  description: string;
  percentage: string;
  revenue: string;
  activeUsers: string;
}

interface PlanDetails {
  plan_name: string;
  cost: string;
  description: string;
}

function SelectedUserProfile() {
  const [openAddPlan, setOpenAddPlan] = useState<boolean>(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [newPlanDetails, setNewPlanDetails] = useState<PlanDetails>({
    plan_name: "",
    cost: "",
    description: "",
  });

  useEffect(() => {
    async function fetchPlans() {
      try {
        const response = await axios.get<{ success: boolean; plans: Plan[] }>(
          "http://localhost:8090/api/v1/gym/plans/getall"
        );
        if (response.data.success) {
          setPlans(response.data.plans);
        } else {
          alert("Failed to fetch plans.");
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
        alert("Failed to fetch plans.");
      }
    }

    fetchPlans();
  }, []);

  const handleOpenAddPlan = () => {
    setOpenAddPlan(true);
  };

  const handleCloseAddPlan = () => {
    setOpenAddPlan(false);
  };

  const handlePlanDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setNewPlanDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddPlan = async () => {
    if (window.confirm("Are you sure you want to add this plan?")) {
      try {
        const response = await axios.post<{
          success: boolean;
          plan_id: number;
        }>("http://localhost:8090/api/v1/gym/plans/create", newPlanDetails);
        if (response.data.success) {
          alert("Plan added successfully.");
          handleCloseAddPlan();
          setPlans([
            ...plans,
            {
              ...newPlanDetails,
              plan_id: response.data.plan_id,
              percentage: "",
              revenue: "",
              activeUsers: "",
            },
          ]);
        } else {
          alert("Failed to add plan.");
        }
      } catch (error) {
        console.error("Failed to add plan:", error);
        alert("Failed to add plan.");
      }
    }
  };

  const randomizedPlans = useMemo(() => {
    const randomSelect = (options: (string | number)[]) =>
      options[Math.floor(Math.random() * options.length)];
    const revenueOptions = [2420, 6240, 3750];
    const percentageOptions = ["54%", "27%", "19%"];
    const activeUsersOptions = [23, 18, 15];

    return plans.map((plan) => ({
      ...plan,
      revenue: randomSelect(revenueOptions).toString(),
      percentage: randomSelect(percentageOptions),
      activeUsers: randomSelect(activeUsersOptions).toString(),
    }));
  }, [plans]);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpenAddPlan}>
        Add Plan
      </Button>
      {randomizedPlans.map((plan: Plan) => (
        <PlanCard
          key={plan.plan_id}
          name={plan.plan_name}
          price={plan.cost}
          plan_id={plan.plan_id}
          description={plan.description}
          revenue={plan.revenue}
          percentage={plan.percentage}
          activeUsers={plan.activeUsers}
        />
      ))}
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
            label="Plan Cost"
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
