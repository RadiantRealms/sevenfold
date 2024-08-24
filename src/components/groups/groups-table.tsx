import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GroupType } from "@/app/types";

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
