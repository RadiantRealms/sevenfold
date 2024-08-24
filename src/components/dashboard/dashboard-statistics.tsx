import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { DashboardDataType } from "@/app/types";

export default function DashboardStatistics({
  dashboardData,
}: {
  dashboardData: DashboardDataType;
}) {
  return (
    <Grid container spacing={2} data-testid="dashboard-statistics">
      <Grid xs={6}>
        <Card
          sx={{ display: "flex", flex: 1, alignItems: "center", px: 2 }}
          variant="outlined"
        >
          <CardMedia>
            <ContactsOutlinedIcon />
          </CardMedia>
          <CardContent>
            <Typography variant="h6" component="a" href="/contacts">
              {dashboardData.contactCount} Registered Contacts
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid xs={6}>
        <Card
          sx={{ display: "flex", flex: 1, alignItems: "center", px: 2 }}
          variant="outlined"
        >
          <CardMedia>
            <GroupsOutlinedIcon />
          </CardMedia>
          <CardContent>
            <Typography variant="h6" component="a" href="/groups">
              {dashboardData.groupCount} Registered Groups
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
