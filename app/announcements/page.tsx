"use client";
import React from "react";
import AnnouncementsTable from "../components/announcement/announcementTable";
import { Button } from "@mui/material";

function page() {
  return (
    <div>
      <div className="flex mb-4 justify-between items-center align-middle">
        <h1 className="text-2xl font-bold ">Announcements </h1>
        <Button variant="contained">New Announcement</Button>
      </div>
      <AnnouncementsTable />
    </div>
  );
}

export default page;
