import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { DashboardDataType } from "@/lib/types";

export default function DashboardStatistics({
  dashboardData,
}: {
  dashboardData: DashboardDataType;
}) {
  const statistics = [
    {
      icon: <ContactsOutlinedIcon />,
      count: dashboardData.contactCount,
      label: "Registered Contact",
      href: "/contacts",
    },
    {
      icon: <GroupsOutlinedIcon />,
      count: dashboardData.groupCount,
      label: "Registered Group",
      href: "/groups",
    },
  ];

  return (
    <Grid container spacing={2} data-testid="dashboard-statistics">
      {statistics.map(({ icon, count, label, href }, index) => (
        <Grid key={index} xs={6}>
          <Card
            sx={{ display: "flex", flex: 1, alignItems: "center", px: 2 }}
            variant="outlined"
          >
            <CardMedia>{icon}</CardMedia>
            <CardContent>
              <Typography variant="h6" component="a" href={href}>
                {count} {label}
                {count !== 1 ? "s" : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
