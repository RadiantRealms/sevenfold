"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Group Name",
    width: 150,
  },
  {
    field: "contacts",
    headerName: "Member Count",
    width: 150,
    renderCell: (params) => {
      if (!params.value) {
        return params.value;
      }
      return params.value.length;
    },
  },
  {
    field: "actions",
    headerName: "Info",
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        icon={<InfoIcon />}
        label="Group Actions"
        component={Link}
        // @ts-ignore
        href={`/groups/${params.id}`}
      />,
    ],
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
