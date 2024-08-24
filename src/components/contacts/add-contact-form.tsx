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
import { MuiTelInput } from "mui-tel-input";
import { ContactType, GroupType } from "@/app/types";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function AddContactForm({ groups }: { groups: GroupType[] }) {
  const router = useRouter();
  const [state, setState] = useState<{
    phone: string;
    selectedState: string;
    associatedGroupId: string | null;
    error: string | null;
  }>({
    phone: "",
    selectedState: "",
    associatedGroupId: null,
    error: null,
  });

  const handlePhoneChange = (phoneValue: string) => {
    setState({
      ...state,
      phone: phoneValue,
    });
  };

  const handleStateChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      selectedState: event.target.value,
    });
  };

  const handleAssociatedGroupChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      associatedGroupId: event.target.value,
    });
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
        state: state.selectedState,
        zip: data.get("zip"),
        phone: state.phone,
        email: data.get("email"),
        groupId: state.associatedGroupId,
      };

      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create new contact");

      const contact: ContactType = await res.json();

      router.push(`/contacts/${contact.id}`);
    } catch (error) {
      setState({
        ...state,
        error: (error as Error).message,
      });
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
            <MuiTelInput
              fullWidth
              label="Phone Number"
              forceCallingCode
              defaultCountry="US"
              value={state.phone}
              onChange={handlePhoneChange}
            />
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
            <FormControl fullWidth>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                id="state-select"
                value={state.selectedState}
                label="State"
                onChange={handleStateChange}
              >
                {states.map((stateName) => (
                  <MenuItem key={stateName} value={stateName}>
                    {stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
                value={state.associatedGroupId ?? ""}
                label="Associated Group"
                onChange={handleAssociatedGroupChange}
              >
                <MenuItem value="">None</MenuItem>
                {groups
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((group: GroupType) => (
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
        {state.error && (
          <Typography variant="body2" color="error" textAlign="center">
            {state.error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
