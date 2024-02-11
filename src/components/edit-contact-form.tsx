"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactType } from "@/app/types";

export default function EditContactForm({ contact }: { contact: ContactType }) {
  const router = useRouter();
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
          <Grid xs={12}>
            <TextField
              fullWidth
              required
              defaultValue={contact.firstName}
              id="firstName"
              label="First Name"
              name="firstName"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              defaultValue={contact.middleName}
              id="middleName"
              label="Middle Name"
              name="middleName"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              required
              defaultValue={contact.lastName}
              id="lastName"
              label="Last Name"
              name="lastName"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              defaultValue={contact.phone}
              id="phone"
              label="Phone Number"
              name="phone"
            />
          </Grid>
          <Grid xs={12}>
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
          <Grid xs={12}>
            <TextField
              defaultValue={contact.city}
              fullWidth
              id="city"
              label="City"
              name="city"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              defaultValue={contact.state}
              fullWidth
              id="state"
              label="State"
              name="state"
            />
          </Grid>
          <Grid xs={12}>
            <TextField
              fullWidth
              defaultValue={contact.zip}
              id="zip"
              label="Zip"
              name="zip"
            />
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
