"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

export default function DashboardHeader() {
  const { user } = useUser();

  if (!user) {
    return false;
  }

  const orgName = user.org_name as string;

  return (
    <Card sx={{ display: "flex", alignItems: "center", px: 2 }}>
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
          You are logged into {orgName}.
        </Typography>
      </CardContent>
    </Card>
  );
}
