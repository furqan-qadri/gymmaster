"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

interface Announcement {
  id: number;
  date: string;
  title: string;
  content: string;
}

const AnnouncementsTable: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteAnnouncement = async () => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8090/api/v1/gym/announcements/${selectedAnnouncement?.id}`
        );
        if (response.data.success) {
          alert("Announcement deleted successfully.");
          window.location.reload(); // Refresh the page to reflect changes
        } else {
          alert("Failed to delete the announcement.");
        }
      } catch (error) {
        console.error("Error deleting the announcement:", error);
        alert("Error occurred while deleting the announcement.");
      }
    }
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/gym/announcements/getall"
        );
        if (response.data.success) {
          const mappedAnnouncements = response.data.announcements.map(
            (announcement: any) => ({
              id: announcement.announcement_id,
              date: new Date(
                announcement.announcement_date
              ).toLocaleDateString(), // Format date for readability
              title: announcement.title,
              content: announcement.content,
            })
          );
          setAnnouncements(mappedAnnouncements);
        } else {
          alert("Failed to fetch announcements: " + response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
        alert(
          "Failed to fetch announcements, check the console for more information."
        );
      }
    };

    fetchAnnouncements();
  }, []);

  const handleAnnouncementClick = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setDialogOpen(true);
  };

  const renderClickableCell = (params: GridCellParams) => (
    <div
      style={{
        cursor: "pointer",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
      onClick={() => handleAnnouncementClick(params.row as Announcement)}
    >
      {params.value}
    </div>
  );

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: renderClickableCell,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: renderClickableCell,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 1,
      renderCell: renderClickableCell,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={announcements}
        columns={columns}
        pageSizeOptions={[10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
      />
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {selectedAnnouncement?.title}
            <IconButton onClick={() => setDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {selectedAnnouncement?.date}
          </Typography>
          <Typography variant="body1">
            <strong>Content:</strong> {selectedAnnouncement?.content}
          </Typography>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button
              onClick={() => console.log("Edit functionality not implemented")}
              color="primary"
            >
              Edit
            </Button>
            <Button onClick={handleDeleteAnnouncement} color="error">
              Delete
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsTable;
