"use client";

import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { TransactionType } from "@/lib/types";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
    renderCell: (params) => {
      return (
        <MuiLink href={`/transactions/${params.value}`}>{params.value}</MuiLink>
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
    valueGetter: (params) => {
      return dayjs(params.value).format("MM/DD/YYYY");
    },
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    valueGetter: (params) => {
      return params.value == "DONATION" ? "Donation" : "Expense";
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    flex: 1,
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
  },
  {
    field: "Contact",
    headerName: "Contact",
    flex: 1,
    renderCell: (params) => {
      if (!params.value) {
        return params.value;
      }
      return (
        <MuiLink
          href={`/contacts/${params.value.id}`}
        >{`${params.value.firstName} ${params.value.middleName} ${params.value.lastName}`}</MuiLink>
      );
    },
  },
];

export default function TransactionsTable({
  transactions,
}: {
  transactions: TransactionType[];
}) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        initialState={{
          sorting: {
            sortModel: [{ field: "date", sort: "desc" }],
          },
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
