"use client";
import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import MemberSignUp from "../components/TrainerSignUp";
import DataGridDemo from "../components/DatagridTrainer";
import MyDropZone from "../components/MyDropzone";
import axios from "axios";

function Members() {
  const [trainers, setTrainers] = useState([]);
  const [totalTrainers, setTotalTrainers] = useState(0);

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/gym/trainers/getall"
        );
        if (response.data.success) {
          setTrainers(response.data.trainers);
          setTotalTrainers(response.data.trainers.length);
        } else {
          alert("Failed to fetch trainers.");
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
        alert("Failed to fetch trainers.");
      }
    }

    fetchTrainers();
  }, []);

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex mb-4 justify-between items-center align-middle">
        <h1 className="text-2xl font-bold">Trainers</h1>
        <Button variant="contained" onClick={handleButtonClick}>
          Add trainer
        </Button>
        {showForm && <MemberSignUp onClose={handleCloseForm} />}
      </div>

      <div className="flex flex-col xl:flex-row xl:gap-5 gap-2 justify-between my-10">
        <div className="rounded-lg p-5 pr-24 min-w-[261px] bg-slate-100 ">
          <div className="mb-2 font-bold">Total trainers</div>
          <div className="text-3xl">{totalTrainers}</div>
        </div>
        <div className="rounded-lg p-5 pr-24 min-w-[241px] bg-slate-100 ">
          <div className="mb-2 font-bold">Added this month</div>
          <div className="text-3xl">{totalTrainers - 2}</div>
        </div>
        <div className="rounded-lg p-5 pr-24 min-w-[241px] bg-slate-100 ">
          <div className="mb-2 font-bold">Added last month</div>
          <div className="text-3xl">2</div>
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
