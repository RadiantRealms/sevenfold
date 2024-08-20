"use client";

import { useEffect, useState } from "react";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Group Name",
    flex: 1,
    renderCell: (params) => {
      return (
        <MuiLink href={`/groups/${params.row.id}`}>{params.row.name}</MuiLink>
      );
    },
  },
  {
    field: "contacts",
    headerName: "Member Count",
    flex: 1,
    renderCell: (params) => {
      if (!params.value) {
        return params.value;
      }
      return params.value.length;
    },
  },
];

export default function GroupsTable() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("/api/groups")
        .then((res) => res.json())
        .then((data) => {
          setGroups(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={groups}
        columns={columns}
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
