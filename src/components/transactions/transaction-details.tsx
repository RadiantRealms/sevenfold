import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MuiLink from "@mui/material/Link";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { TransactionType } from "@/lib/types";

export default function TransactionDetails({
  transaction,
}: {
  transaction: TransactionType;
}) {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {`${
          transaction.type == "EXPENSE"
            ? `$${-transaction.amount} Expense`
            : `$${transaction.amount} Donation`
        } on ${dayjs(transaction.date).format("MM/DD/YYYY")}`}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Button
        component="a"
        href={`/transactions/${transaction.id}/edit`}
        variant="contained"
        startIcon={<EditIcon />}
        sx={{ mt: 1, mb: 3 }}
      >
        Edit Transaction
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Paper sx={{ width: "100%", p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Basic Details
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography gutterBottom variant="subtitle2" fontWeight={500}>
                Date
              </Typography>
              <Typography variant="body1" sx={{ minHeight: 24 }}>
                {dayjs(transaction.date).format("MM/DD/YYYY")}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid xs={12}>
              <Typography gutterBottom variant="subtitle2" fontWeight={500}>
                Transaction ID
              </Typography>
              <Typography variant="body1" sx={{ minHeight: 24 }}>
                {transaction.id}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid xs={12}>
              <Typography gutterBottom variant="subtitle2" fontWeight={500}>
                Transaction Type
              </Typography>
              <Typography variant="body1" sx={{ minHeight: 24 }}>
                {transaction.type == "EXPENSE" ? "Expense" : "Donation"}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <Grid xs={12}>
              <Typography gutterBottom variant="subtitle2" fontWeight={500}>
                Amount
              </Typography>
              <Typography variant="body1" sx={{ minHeight: 24 }}>
                {`${transaction.amount}`}
              </Typography>
              <Divider sx={{ my: 2 }} />
            </Grid>
            {transaction.Contact && (
              <Grid xs={12}>
                <Typography gutterBottom variant="subtitle2" fontWeight={500}>
                  Associated Contact
                </Typography>
                <Typography
                  component={MuiLink}
                  href={`/contacts/${transaction.contactId}`}
                  variant="body1"
                  sx={{ minHeight: 24 }}
                >
                  {`${transaction.Contact.firstName} ${transaction.Contact.middleName} ${transaction.Contact.lastName}`}
                </Typography>
                <Divider sx={{ my: 2 }} />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
