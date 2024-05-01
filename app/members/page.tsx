"use client";
import React, { useState } from "react";
import DataGridDemo from "../components/Datagrid";
import { Button, Dialog, DialogContent } from "@mui/material";
import MemberSignUp from "../components/memberSignUp";

function Members() {
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return; // Prevent closing the dialog on click outside or escape key
    }
    handleCloseSignUp();
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold ">Members</h1>
        <Button variant="contained" onClick={handleOpenSignUp}>
          Add member
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between my-10">
        <div className="rounded-lg p-5 pr-24 min-w-[261px] bg-slate-100 ">
          <div className="mb-2 font-bold">Total Members</div>
          <div className="text-3xl">87</div>
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
      <Dialog open={openSignUp} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          <MemberSignUp onClose={handleClose} />
        </DialogContent>
      </Dialog>
      <DataGridDemo />
    </div>
  );
}

export default Members;
