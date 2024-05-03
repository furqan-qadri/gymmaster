"use client";
import React, { useState } from "react";
import AnnouncementsTable from "../components/announcement/announcementTable";
import { Button } from "@mui/material";
import AnnouncementForm from "../components/announcementForm";

function Page() {
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
        <h1 className="text-2xl font-bold">Announcements</h1>
        <Button variant="contained" onClick={handleButtonClick}>
          New Announcement
        </Button>
        {showForm && <AnnouncementForm onClose={handleCloseForm} />}
      </div>
      <AnnouncementsTable />
    </div>
  );
}

export default Page;
