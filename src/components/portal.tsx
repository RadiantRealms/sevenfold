import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Portal() {
  return (
    <Grid container spacing={2} maxWidth="sm" sx={{ margin: "auto" }}>
      <Grid xs={12}>
        <Button
          fullWidth
          component="a"
          href="/api/auth/login"
          variant="contained"
        >
          Log In
        </Button>
      </Grid>
      <Grid xs={12}>
        <Button
          fullWidth
          component="a"
          href="/api/auth/signup"
          variant="contained"
        >
          Sign Up
        </Button>
      </Grid>
    </Grid>
  );
}
