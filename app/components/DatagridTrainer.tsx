"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation"; // Correctly importing useRouter
import Avatar from "@mui/material/Avatar";
import axios from "axios";

interface Trainer {
  id: number; // This will be the `trainer_id` from the API
  full_name: string;
  age: number;
  active_status: string;
  sex: string;
}

export default function TrainerDataGrid() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const router = useRouter();

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const url = `http://localhost:8090/api/v1/gym/trainers/delete/${id}`;
        await axios.delete(url);
        alert("Trainer deleted successfully");
        setTrainers(trainers.filter((trainer) => trainer.id !== id)); // Optimistic update without refresh
      } catch (error) {
        console.error("Failed to delete the trainer:", error);
        alert("Failed to delete the trainer");
      }
    }
  };

  useEffect(() => {
    async function fetchTrainers() {
      try {
        const response = await axios.get(
          "http://localhost:8090/api/v1/gym/trainers/getall"
        );
        if (response.data.success) {
          setTrainers(
            response.data.trainers.map(
              (trainer: {
                trainer_id: any;
                full_name: any;
                age: any;
                active_status: number;
                sex: any;
              }) => ({
                id: trainer.trainer_id, // Assuming API response matches this structure
                full_name: trainer.full_name,
                age: trainer.age,
                active_status:
                  trainer.active_status === 1 ? "Active" : "Inactive",
                sex: trainer.sex,
              })
            )
          );
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrainers();
  }, []);

  const handleNameClick = (id: number) => {
    router.push(`/trainers/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredRows = trainers.filter((trainer) =>
    trainer.full_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: GridColDef<Trainer>[] = [
    {
      field: "full_name",
      headerName: "Name",
      type: "string",
      flex: 0.7,
      renderCell: (params) => (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => handleNameClick(params.id.toString())}
        >
          <div className="flex gap-3 items-center">
            <Avatar
              sx={{ alignItems: "center" }}
              alt=""
              src="/static/images/avatar/1.jpg"
            />
            {params.value}
          </div>
        </div>
      ),
    },
    { field: "sex", headerName: "Sex", type: "string", flex: 0.3 },
    { field: "age", headerName: "Age", type: "number", flex: 0.2 },
    {
      field: "active_status",
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
          onClick={() => handleDelete(params.id, params.row.full_name)}
          showInMenu
        />,
      ],
      flex: 1,
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "99%", overflow: "auto" }}>
      <Box sx={{ height: 70, width: "100%", marginTop: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search trainer"
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
        autoHeight
      />
    </Box>
  );
}
