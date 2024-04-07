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
    field: "firstName",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "middleName",
    headerName: "Middle Name",
    width: 150,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "actions",
    headerName: "Profile",
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        icon={<InfoIcon />}
        label="View Profile"
        component={Link}
        // @ts-ignore
        href={`/contacts/${params.id}`}
      />,
    ],
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
