import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Filter7Icon from "@mui/icons-material/Filter7";

export default function Portal() {
  return (
    <Container maxWidth="sm" data-testid="portal">
      <Card
        variant="outlined"
        sx={{
          my: 8,
          p: 4,
          width: "100%",
        }}
      >
        <Avatar
          sx={{
            margin: "auto",
            bgcolor: "primary.main",
            width: 60,
            height: 60,
          }}
        >
          <Filter7Icon fontSize="large" />
        </Avatar>
        <Typography variant="h3" sx={{ textAlign: "center", m: 2 }}>
          Sevenfold
        </Typography>
        <Grid container spacing={2} sx={{ margin: "auto" }}>
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
      </Card>
    </Container>
  );
}
