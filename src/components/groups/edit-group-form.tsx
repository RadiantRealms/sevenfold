"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GroupType } from "@/app/types";

export default function EditGroupForm({ group }: { group: GroupType }) {
  const router = useRouter();
  const [state, setState] = useState<{
    groupName: string;
    error: string | null;
  }>({
    groupName: group.name,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name");
      const body = { name };

      const res = await fetch(`/api/groups/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update group");

      const updatedGroup = await res.json();

      router.push(`/groups/${updatedGroup.id}`);
    } catch (error) {
      setState({ ...state, error: (error as Error).message });
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
        Edit Group
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: "100%" }}
      >
        <TextField
          fullWidth
          required
          defaultValue={group.name}
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
        {state.error && (
          <Typography variant="body2" color="error" textAlign="center">
            {state.error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
