import Grid from "@mui/material/Unstable_Grid2";
import DashboardHeader from "./dashboard-header";
import DashboardStatistics from "./dashboard-statistics";

import { DashboardDataType } from "@/lib/types";
import type { UserProfile } from "@auth0/nextjs-auth0/client";

export default function Dashboard({
  user,
  dashboardData,
}: {
  user: UserProfile;
  dashboardData: DashboardDataType;
}) {
  return (
    <Grid container spacing={2} data-testid="dashboard">
      <Grid xs={12}>
        <DashboardHeader user={user} />
      </Grid>
      <Grid xs={12}>
        <DashboardStatistics dashboardData={dashboardData} />
      </Grid>
    </Grid>
  );
}
