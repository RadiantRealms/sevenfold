"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <Typography variant="h6">Something went wrong!</Typography>
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
