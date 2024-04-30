import { Button } from "@mui/material";
import React from "react";
import PlanCard from "../components/plans/plancard";

function page() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Plans</h1>
        <Button variant="contained">Add plan</Button>
      </div>
      <PlanCard />
      <PlanCard />
      <PlanCard />
    </div>
  );
}

export default page;
