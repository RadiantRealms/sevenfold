"use client";

import { useEffect, useState } from "react";
import AddTransactionForm from "@/components/transactions/add-transaction-form";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { ContactType } from "@/lib/types";

export default function AddTransactionPage() {
  const [state, setState] = useState<{
    contacts: ContactType[];
    isLoading: boolean;
    error: string | null;
  }>({
    contacts: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/contacts");

        if (!res.ok) throw new Error("Failed to fetch contacts");

        const contacts: ContactType[] = await res.json();

        setState({ contacts, isLoading: false, error: null });
      } catch (error) {
        setState({
          contacts: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
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
      <AddTransactionForm contacts={state.contacts} />
    </main>
  );
}
