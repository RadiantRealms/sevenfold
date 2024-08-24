import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ErrorMessage({ error }: { error: string }) {
  return (
    <>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        {error}
      </Typography>
      <Button component="a" href="/" variant="contained" sx={{ mb: 3 }}>
        Return to Dashboard
      </Button>
    </>
  );
}
