import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { GroupType } from "@/lib/types";

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
    valueGetter: (params) => params.value.length,
  },
];

export default function GroupsTable({ groups }: { groups: GroupType[] }) {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={groups}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
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
