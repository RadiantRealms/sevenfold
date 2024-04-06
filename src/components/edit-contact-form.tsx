"use client";

import { useEffect, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { ContactType, GroupType } from "@/app/types";

export default function EditContactForm({ contact }: { contact: ContactType }) {
  const router = useRouter();
  const [groupList, setGroupList] = useState<GroupType[]>([]);
  const [associatedGroupId, setAssociatedGroupId] = useState(contact.groupId);
  const [isLoading, setLoading] = useState(true);

  const handleAssociatedGroupChange = (event: SelectChangeEvent) => {
    setAssociatedGroupId(event.target.value);
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

      await fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      router.push(`/contacts/${contact.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      fetch("/api/groups")
        .then((res) => res.json())
        .then((data) => {
          setGroupList(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Edit Contact
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <TextField
              fullWidth
              required
              defaultValue={contact.firstName}
              id="firstName"
              label="First Name"
              name="firstName"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              defaultValue={contact.middleName}
              id="middleName"
              label="Middle Name"
              name="middleName"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              required
              defaultValue={contact.lastName}
              id="lastName"
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              defaultValue={contact.phone}
              id="phone"
              label="Phone Number"
              name="phone"
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              fullWidth
              defaultValue={contact.email}
              id="email"
              label="Email Address"
              name="email"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              defaultValue={contact.address1}
              id="address1"
              label="Address Line 1"
              name="address1"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              defaultValue={contact.address2}
              id="address2"
              label="Address Line 2"
              name="address2"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              defaultValue={contact.city}
              fullWidth
              id="city"
              label="City"
              name="city"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              defaultValue={contact.state}
              fullWidth
              id="state"
              label="State"
              name="state"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              defaultValue={contact.zip}
              id="zip"
              label="Zip"
              name="zip"
            />
          </Grid>
          <Grid xs={12}>
            <FormControl fullWidth>
              <InputLabel id="associated-group-select-label">
                Associated Group
              </InputLabel>
              <Select
                labelId="associated-group-select-label"
                id="associated-group-select"
                value={associatedGroupId || ""}
                label="Associated Group"
                onChange={handleAssociatedGroupChange}
              >
                <MenuItem value={""}>None</MenuItem>
                {groupList.map((group: GroupType) => (
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
          href={`/contacts/${contact.id}`}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
