"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Grid from "@mui/material/Unstable_Grid2";
import Portal from "@/components/portal";
import DashboardHeader from "@/components/dashboard-header";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <main>
        <Portal />
      </main>
    );
  }

  return (
    <main>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <DashboardHeader />
        </Grid>
      </Grid>
    </main>
  );
}
