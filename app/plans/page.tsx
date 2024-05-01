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
    </div>
  );
}

export default page;
