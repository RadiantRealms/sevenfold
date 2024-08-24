import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import type { UserProfile } from "@auth0/nextjs-auth0/client";

export default function DashboardHeader({ user }: { user: UserProfile }) {
  const orgDisplayName = user.orgDisplayName as string;

  return (
    <Card
      sx={{ display: "flex", alignItems: "center", px: 2 }}
      variant="outlined"
      data-testid="dashboard-header"
    >
      <CardMedia
        component="img"
        sx={{ height: 70, width: 70 }}
        image={user.picture!}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle1" component="div">
          You are logged into {orgDisplayName}.
        </Typography>
      </CardContent>
    </Card>
  );
}
