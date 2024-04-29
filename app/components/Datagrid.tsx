"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "firstName",
    headerName: "Name",
    type: "string",
    flex: 0.7,
  },
  {
    field: "lastName",
    headerName: "Sex",
    type: "string",
    flex: 0.3,
  },
  {
    field: "age",
    headerName: "Age",
    type: "string",
    flex: 0.2,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    flex: 0.4,
  },
  {
    field: "actions",
    headerName: "More Actions",
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        icon={<VisibilityIcon />}
        label="View"
        onClick={() => alert(`Viewing ${params.id}`)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => alert(`Deleting ${params.id}`)}
        showInMenu
      />,
    ],
    flex: 1,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14, status: "Active" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataGridDemo() {
  const [searchText, setSearchText] = React.useState("");
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return (
      row.firstName?.toLowerCase().includes(searchText.toLowerCase()) ||
      row.lastName?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box sx={{ height: 70, width: "100%", marginTop: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search member"
          value={searchText}
          onChange={handleSearchChange}
          style={{ marginBottom: "20px" }}
        />
      </Box>

      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableSelectionOnClick
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
