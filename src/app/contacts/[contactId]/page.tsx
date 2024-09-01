"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ContactDetails from "@/components/contacts/contact-details";
import DeleteContactButton from "@/components/contacts/delete-contact-button";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { ContactType } from "@/lib/types";

interface IParams {
  contactId: string;
}

export default function ContactDetailsPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    contact: ContactType | null;
    isLoading: boolean;
    error: string | null;
  }>({
    contact: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await fetch(`/api/contacts/${params.contactId}`);

        if (!res.ok) throw new Error("Failed to fetch contact with that ID");

        const data: ContactType = await res.json();

        setState({ contact: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          contact: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchContact();
  }, [params.contactId]);

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
        href="/contacts"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        View All Contacts
      </Button>
      {state.contact && (
        <>
          <ContactDetails contact={state.contact} />
          <DeleteContactButton contactId={params.contactId} />
        </>
      )}
    </main>
  );
}
