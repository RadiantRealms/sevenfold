import Grid from "@mui/material/Unstable_Grid2";
import DashboardHeader from "@/components/dashboard-header";

import type { UserProfile } from "@auth0/nextjs-auth0/client";

export default function Dashboard({ user }: { user: UserProfile }) {
  return (
    <Grid container spacing={2} data-testid="dashboard">
      <Grid xs={12}>
        <DashboardHeader user={user} />
      </Grid>
    </Grid>
  );
}
