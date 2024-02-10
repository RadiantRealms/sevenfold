import { ContactType } from "@/app/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";

export default function ContactDetails({ contact }: { contact: ContactType }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper sx={{ width: "100%", p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic Details
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              First Name
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.firstName}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              Middle Name
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.middleName}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              Last Name
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.lastName}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              Address Line 1
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.address1}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              Address Line 2
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.address2}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              City
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.city}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              State
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.state}
            </Typography>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid xs={12}>
            <Typography gutterBottom variant="subtitle2" fontWeight={500}>
              Zip
            </Typography>
            <Typography variant="body1" sx={{ minHeight: 24 }}>
              {contact.zip}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
