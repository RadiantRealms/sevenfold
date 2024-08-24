"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import ContactsTable from "@/components/contacts/contacts-table";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { ContactType } from "@/app/types";

export default function ContactsPage() {
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
    async function fetchContacts() {
      try {
        const res = await fetch("/api/contacts");

        if (!res.ok) throw new Error("Failed to fetch contacts");

        const data: ContactType[] = await res.json();

        setState({ contacts: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          contacts: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchContacts();
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
        href="/contacts/add"
        variant="contained"
        startIcon={<PersonAddIcon />}
        sx={{ mb: 3 }}
      >
        Add Contact
      </Button>
      <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
        Contacts
      </Typography>
      <ContactsTable contacts={state.contacts} />
    </main>
  );
}
