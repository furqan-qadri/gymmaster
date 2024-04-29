"use client";
import React, { useState, useEffect } from "react";
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
    field: "sex",
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
  {
    id: 1,
    firstName: "Muhammad Amir Bin Mazlan",
    age: 24,
    status: "Active",
    sex: "Male",
  },
  {
    id: 2,
    firstName: "Ayesha Siddiqua",
    age: 30,
    status: "Inactive",
    sex: "Female",
  },
  {
    id: 3,
    firstName: "Khalid Bin Walid",
    age: 27,
    status: "Active",
    sex: "Male",
  },
  {
    id: 4,
    firstName: "Fatimah Zahra",
    age: 22,
    status: "Active",
    sex: "Female",
  },
  {
    id: 5,
    firstName: "Yusuf Alai",
    age: 35,
    status: "Inactive",
    sex: "Male",
  },
  {
    id: 6,
    firstName: "Zainab Bint Ali",
    age: 28,
    status: "Active",
    sex: "Female",
  },
  {
    id: 7,
    firstName: "Abdullah Yusuf",
    age: 31,
    status: "Active",
    sex: "Male",
  },
  {
    id: 8,
    firstName: "Noor Fatima",
    age: 26,
    status: "Active",
    sex: "Female",
  },
  {
    id: 9,
    firstName: "Ibrahim Moiz",
    age: 23,
    status: "Inactive",
    sex: "Male",
  },
  {
    id: 10,
    firstName: "Safia Naseem",
    age: 29,
    status: "Active",
    sex: "Female",
  },
];

export default function DataGridDemo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 2 seconds simulated load time

    return () => {
      clearTimeout(timer);
    };
  }, []);

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
        loading={loading}
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
