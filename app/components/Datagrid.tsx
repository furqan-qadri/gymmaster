"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

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
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const router = useRouter();
  const handleNameClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchText(event.target.value);
  };

  const filteredRows = rows.filter((row) => {
    return row.firstName.toLowerCase().includes(searchText.toLowerCase());
  });

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "firstName",
      headerName: "Name",
      type: "string",
      flex: 0.7,
      renderCell: (params) => (
        <div
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleNameClick(params.id.toString())}
        >
          {params.value}
        </div>
      ),
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
          key="view"
          icon={<VisibilityIcon />}
          label="View"
          onClick={() => handleNameClick(params.id.toString())}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => alert(`Deleting ${params.id}`)}
          showInMenu
        />,
      ],
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
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
        pageSizeOptions={[10, 25]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        loading={loading}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
      />
    </Box>
  );
}
