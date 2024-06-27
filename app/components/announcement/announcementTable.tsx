"use client";
import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import {
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

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/gym/announcements/getall"
        );
        if (response.data.success) {
          const mappedAnnouncements = response.data.announcements.map(
            (announcement) => ({
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementsTable;
