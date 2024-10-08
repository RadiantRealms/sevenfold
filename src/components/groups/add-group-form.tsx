"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AddGroupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    try {
      const res = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error("Failed to create new group");

      const group = await res.json();
      router.push(`/groups/${group.id}`);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography component="h1" variant="h5">
        Add Group
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "100%" }}
      >
        <TextField
          fullWidth
          required
          id="name"
          label="Group Name"
          name="name"
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
        <Button
          component="a"
          href="/groups"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Cancel
        </Button>
        {error && (
          <Typography variant="body2" color="error" textAlign="center">
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
