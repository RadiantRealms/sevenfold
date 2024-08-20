import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditTransactionForm from "@/components/transactions/edit-transaction-form";
import prisma from "../../../../lib/prisma";

interface IParams {
  transactionId: string;
}

async function getTransactionDetails(id: string) {
  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
    },
  });
  return transaction;
}

export default async function EditTransactionPage({
  params,
}: {
  params: IParams;
}) {
  const { transactionId } = params;
  const transaction = await getTransactionDetails(transactionId);
  if (!transaction) {
    return false;
  }

  return (
    <main>
      <Button
        component="a"
        href={`/transactions/${transactionId}`}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Return to transaction details
      </Button>
      <EditTransactionForm transaction={transaction} />
    </main>
  );
}
