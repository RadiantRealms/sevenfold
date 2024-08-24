import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsTable from "@/components/groups/groups-table";
import Typography from "@mui/material/Typography";

export default function GroupsPage() {
  return (
    <main>
      <Button
        component="a"
        href="/groups/add"
        variant="contained"
        startIcon={<GroupAddIcon />}
        sx={{ mb: 3 }}
      >
        Add Group
      </Button>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Groups
      </Typography>
      <GroupsTable />
    </main>
  );
}
