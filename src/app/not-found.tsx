"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  const router = useRouter();

  return (
    <div>
      <Typography variant="h6">Page not found</Typography>
      <Button
        variant="contained"
        onClick={() => router.push("/")}
        sx={{ my: 2 }}
      >
        Return to dashboard
      </Button>
    </div>
  );
}
