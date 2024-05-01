import React, { useState } from "react";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Define the type for announcement data
interface Announcement {
  id: number;
  date: string;
  title: string;
  content: string;
}

// Dummy data for announcements
const announcements: Announcement[] = [
  {
    id: 1,
    date: "2024-04-30",
    title: "Important Announcement",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    date: "2024-04-29",
    title: "Upcoming Event",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  // Add more announcements as needed
];

const AnnouncementsTable: React.FC = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      {params.row[params.field]}
    </div>
  );

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      flex: 0.5,
      renderCell: renderClickableCell,
    },
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
            <strong>ID:</strong> {selectedAnnouncement?.id}
          </Typography>
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
