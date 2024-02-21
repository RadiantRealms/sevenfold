"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteTransactionButton({
  transactionId,
}: {
  transactionId: string;
}) {
  const router = useRouter();
  const deleteTransaction = async (id: string) => {
    try {
      await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      router.push("/transactions");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={() => deleteTransaction(transactionId)}
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      sx={{ my: 3 }}
    >
      Delete Transaction
    </Button>
  );
}
