"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation"; // Make sure this is correctly imported
import Avatar from "@mui/material/Avatar";
import axios from "axios"; // Ensure Axios is imported

interface Member {
  id: number; // This will be the `member_id` from the API
  full_name: string;
  age: number;
  active_status: string;
  sex: string;
}

export default function DataGridDemo() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await axios.get<{
          success: boolean;
          message: string;
          members: any[]; // Temporarily using any to handle the API's mixed data types
        }>("http://localhost:8090/api/v1/gym/members/getall");
        if (response.data.success) {
          setMembers(
            response.data.members.map((member) => ({
              id: member.member_id, // Correctly mapping `member_id` to `id`
              full_name: member.full_name,
              age: member.age,
              active_status: member.active_status === 1 ? "Active" : "Inactive",
              sex: member.sex,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  const handleNameClick = (id: string) => {
    router.push(`/members/${id}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredRows = members.filter((member) =>
    member.full_name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: GridColDef<Member>[] = [
    {
      field: "full_name", // Corrected from "firstName" to "full_name"
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
      field: "active_status", // Corrected from "status" to "active_status"
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
    <Box sx={{ height: "100%", width: "99%", overflow: "auto" }}>
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
        autoHeight
      />
    </Box>
  );
}
