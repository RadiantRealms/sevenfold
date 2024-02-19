import Button from "@mui/material/Button";
import PaidIcon from "@mui/icons-material/Paid";
import TransactionsTable from "@/components/transactions-table";

export default async function Transactions() {
  return (
    <main>
      <Button
        component="a"
        href="/transactions/add"
        variant="contained"
        startIcon={<PaidIcon />}
        sx={{ mb: 3 }}
      >
        Record Transaction
      </Button>
      <TransactionsTable />
    </main>
  );
}
