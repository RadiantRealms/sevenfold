"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteTransactionButton from "@/components/transactions/delete-transaction-button";
import TransactionDetails from "@/components/transactions/transaction-details";
import ErrorMessage from "@/components/common/error-message";
import LoadingComponent from "@/components/common/loading-component";
import { TransactionType } from "@/lib/types";

interface IParams {
  transactionId: string;
}

export default function TransactionPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    transaction: TransactionType | null;
    isLoading: boolean;
    error: string | null;
  }>({
    transaction: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const res = await fetch(`/api/transactions/${params.transactionId}`);

        if (!res.ok)
          throw new Error("Failed to fetch transaction with that ID");

        const data: TransactionType = await res.json();

        setState({ transaction: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          transaction: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchTransaction();
  }, [params.transactionId]);

  if (state.isLoading)
    return (
      <main>
        <LoadingComponent />
      </main>
    );

  if (state.error)
    return (
      <main>
        <ErrorMessage error={state.error} />
      </main>
    );

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
      {state.transaction && (
        <>
          <TransactionDetails transaction={state.transaction} />
          <DeleteTransactionButton transactionId={state.transaction.id} />
        </>
      )}
    </main>
  );
}
