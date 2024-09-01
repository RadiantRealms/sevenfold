"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditTransactionForm from "@/components/transactions/edit-transaction-form";
import ErrorMessage from "@/components/common/error-message";
import LoadingComponent from "@/components/common/loading-component";
import { ContactType, TransactionType } from "@/lib/types";

interface IParams {
  transactionId: string;
}

export default function EditTransactionPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    transaction: TransactionType | null;
    contacts: ContactType[];
    isLoading: boolean;
    error: string | null;
  }>({
    transaction: null,
    contacts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchTransaction = await fetch(
          `/api/transactions/${params.transactionId}`
        );

        if (!fetchTransaction.ok)
          throw new Error("Failed to fetch transaction with that ID");

        const transaction: TransactionType = await fetchTransaction.json();

        const fetchContacts = await fetch("/api/contacts");

        if (!fetchContacts.ok) throw new Error("Failed to fetch contacts");

        const contacts: ContactType[] = await fetchContacts.json();

        setState({ transaction, contacts, isLoading: false, error: null });
      } catch (error) {
        setState({
          transaction: null,
          contacts: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
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
      {state.transaction && (
        <>
          <Button
            component="a"
            href={`/transactions/${state.transaction.id}`}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Return to transaction details
          </Button>
          <EditTransactionForm
            transaction={state.transaction}
            contacts={state.contacts}
          />
        </>
      )}
    </main>
  );
}
