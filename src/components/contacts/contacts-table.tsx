"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import MuiLink from "@mui/material/Link";
import LoadingComponent from "../common/loading-component";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID" },
  {
    field: "name",
    headerName: "Name",
    flex: 1,
    valueGetter: (params) =>
      `${params.row.firstName} ${params.row.middleName} ${params.row.lastName}`,
    renderCell: (params) => {
      return (
        <MuiLink href={`/contacts/${params.row.id}`}>
          {params.row.firstName} {params.row.middleName} {params.row.lastName}
        </MuiLink>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "group",
    headerName: "Group",
    flex: 1,
    valueGetter: (params) => `${params.row.Group?.name}`,
    renderCell: (params) => {
      if (params.row.Group?.name) {
        return (
          <MuiLink href={`/groups/${params.row.Group?.id}`}>
            {params.row.Group?.name}
          </MuiLink>
        );
      } else {
        return "N/A";
      }
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
];

export default function ContactsTable() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("/api/contacts")
        .then((res) => res.json())
        .then((data) => {
          setContacts(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={contacts}
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
