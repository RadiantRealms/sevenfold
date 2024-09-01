"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PaidIcon from "@mui/icons-material/Paid";
import TransactionsTable from "@/components/transactions/transactions-table";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { TransactionType } from "@/lib/types";

export default function TransactionsPage() {
  const [state, setState] = useState<{
    transactions: TransactionType[];
    isLoading: boolean;
    error: string | null;
  }>({
    transactions: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");

        if (!res.ok) throw new Error("Failed to fetch transactions");

        const data: TransactionType[] = await res.json();

        setState({ transactions: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          transactions: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchTransactions();
  }, []);

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
        href="/transactions/add"
        variant="contained"
        startIcon={<PaidIcon />}
        sx={{ mb: 3 }}
      >
        Record Transaction
      </Button>
      <TransactionsTable transactions={state.transactions} />
    </main>
  );
}
