"use client";
import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import MemberSignUp from "../components/memberSignUp";
import DataGridDemo from "../components/Datagrid";
import MyDropZone from "../components/MyDropzone";

function Members() {
  // const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  // const handleOpenSignUp = () => {
  //   setOpenSignUp(true);
  // };

  // const handleCloseSignUp = () => {
  //   setOpenSignUp(false);
  // };

  // const handleClose = (
  //   event: React.SyntheticEvent<Element, Event>,
  //   reason: string
  // ) => {
  //   if (reason === "backdropClick" || reason === "escapeKeyDown") {
  //     return; // Prevent closing the dialog on click outside or escape key
  //   }
  //   handleCloseSignUp();
  // };

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <MyDropZone />
      <div className="flex mb-4 justify-between items-center align-middle">
        <h1 className="text-2xl font-bold">Members</h1>
        <Button variant="contained" onClick={handleButtonClick}>
          Add member
        </Button>
        {showForm && <MemberSignUp onClose={handleCloseForm} />}
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

      {/* <Dialog open={openSignUp} onClose={handleClose} disableEscapeKeyDown>
        <DialogContent>
          <MemberSignUp onClose={onClose()=>{handleClose}}/>
        </DialogContent>
      </Dialog> */}
      <DataGridDemo />
    </div>
  );
}

export default Members;
