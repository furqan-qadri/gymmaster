import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

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
  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "No", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
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
    </div>
  );
};

export default AnnouncementsTable;
