"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GroupType } from "@/app/types";

export default function AddContactForm({ groups }: { groups: GroupType[] }) {
  const router = useRouter();
  const [associatedGroupId, setAssociatedGroupId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleAssociatedGroupChange = (event: SelectChangeEvent) => {
    setAssociatedGroupId(event.target.value as string);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const body = {
        firstName: data.get("firstName"),
        middleName: data.get("middleName"),
        lastName: data.get("lastName"),
        address1: data.get("address1"),
        address2: data.get("address2"),
        city: data.get("city"),
        state: data.get("state"),
        zip: data.get("zip"),
        phone: data.get("phone"),
        email: data.get("email"),
        groupId: associatedGroupId,
      };

      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const { error } = await res.json();
        setError(error);
        return;
      }

      const contact = await res.json();

      router.push(`/contacts/${contact.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Add Contact
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              fullWidth
              required
              id="firstName"
              label="First Name"
              name="firstName"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              id="middleName"
              label="Middle Name"
              name="middleName"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              required
              id="lastName"
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid xs={6}>
            <TextField fullWidth id="phone" label="Phone Number" name="phone" />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              required
              id="email"
              type="email"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="address1"
              label="Address Line 1"
              name="address1"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              id="address2"
              label="Address Line 2"
              name="address2"
            />
          </Grid>
          <Grid xs={4}>
            <TextField fullWidth id="city" label="City" name="city" />
          </Grid>
          <Grid xs={4}>
            <TextField fullWidth id="state" label="State" name="state" />
          </Grid>
          <Grid xs={4}>
            <TextField fullWidth id="zip" label="Zip" name="zip" />
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel id="associated-group-select-label">
                Associated Group
              </InputLabel>
              <Select
                labelId="associated-group-select-label"
                id="associated-group-select"
                value={associatedGroupId ?? ""}
                label="Associated Group"
                onChange={handleAssociatedGroupChange}
              >
                <MenuItem value="">None</MenuItem>
                {groups.map((group: GroupType) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
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
          href="/contacts"
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
