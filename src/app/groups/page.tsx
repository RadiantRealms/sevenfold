import Button from "@mui/material/Button";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupsTable from "@/components/groups-table";

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
      <GroupsTable />
    </main>
  );
}
