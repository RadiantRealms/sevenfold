"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      return dayjs(params.value).format("MM/DD/YYYY");
    },
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
    valueGetter: (params) => {
      if (!params.value) {
        return params.value;
      }

      return `$${params.value}`;
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 150,
  },
  {
    field: "actions",
    type: "actions",
    getActions: (params) => [
      <GridActionsCellItem
        key={params.id}
        icon={<InfoIcon />}
        label="View Transaction"
        component={Link}
        // @ts-ignore
        href={`/transactions/${params.id}`}
      />,
    ],
  },
];

export default function TransactionsTable() {
  const [transcations, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("/api/transactions")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
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
        rows={transcations}
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
