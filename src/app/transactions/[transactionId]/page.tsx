import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteTransactionButton from "@/components/delete-transaction-button";
import TransactionDetails from "@/components/transaction-details";
import prisma from "../../../lib/prisma";

interface IParams {
  transactionId: string;
}

async function getTransactionDetails(id: string) {
  const contact = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });

  return contact;
}

export default async function TransactionPage({ params }: { params: IParams }) {
  const { transactionId } = params;
  const transaction = await getTransactionDetails(transactionId);

  if (!transaction) {
    return false;
  }

  return (
    <main>
      <Button
        component="a"
        href="/transactions"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        View All Transactions
      </Button>
      <TransactionDetails transaction={transaction} />
      <DeleteTransactionButton transactionId={transactionId} />
    </main>
  );
}
