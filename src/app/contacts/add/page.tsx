"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function AddContactForm() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const body = {
        firstName: data.get("firstName"),
        middleName: data.get("middleName"),
        lastName: data.get("lastName"),
      };

      await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      router.push("/contacts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="firstName"
                label="First Name"
                name="firstName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="middleName"
                label="Middle Name"
                name="middleName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="lastName"
                label="Last Name"
                name="lastName"
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
            href="/contacts"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </main>
  );
}
