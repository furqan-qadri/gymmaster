import React from "react";
import DataGridDemo from "../components/Datagrid";
import { Button } from "@mui/material";
import MemberSignUp from "../components/memberSignUp";

function members() {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Members</h1>
        <Button variant="contained" href="#contained-buttons">
          Add member
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between my-10">
        <div className="rounded-lg p-5 pr-24 min-w-[241px] bg-slate-100 ">
          <div className="mb-2 font-bold">Total Members</div>
          <div>87</div>
        </div>
        <div className="rounded-lg p-5 pr-24 min-w-[241px] bg-slate-100 ">
          <div className="mb-2 font-bold">Active Members</div>
          <div>67</div>
        </div>
        <div className="rounded-lg p-5 pr-24 min-w-[241px] bg-slate-100 ">
          <div className="mb-2 font-bold">Added last month</div>
          <div>14</div>
        </div>
      </div>
      <MemberSignUp />
      <DataGridDemo />
    </div>
  );
}

export default members;
