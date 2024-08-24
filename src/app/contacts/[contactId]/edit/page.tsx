"use client";

import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditContactForm from "@/components/contacts/edit-contact-form";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { ContactType, GroupType } from "@/app/types";

interface IParams {
  contactId: string;
}

export default function EditContactPage({ params }: { params: IParams }) {
  const [state, setState] = useState<{
    contact: ContactType | null;
    groups: GroupType[];
    isLoading: boolean;
    error: string | null;
  }>({
    contact: null,
    groups: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchContact = await fetch(`/api/contacts/${params.contactId}`);
        if (!fetchContact.ok) throw new Error("Failed to fetch contact");

        const contact: ContactType = await fetchContact.json();

        const fetchGroups = await fetch("/api/groups");
        if (!fetchGroups.ok) throw new Error("Failed to fetch groups");

        const groups: GroupType[] = await fetchGroups.json();

        setState({ contact, groups, isLoading: false, error: null });
      } catch (error) {
        setState({
          contact: null,
          groups: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
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
      {state.contact && (
        <>
          <Button
            component="a"
            href={`/contacts/${params.contactId}`}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Return to contact profile
          </Button>
          <EditContactForm contact={state.contact} groups={state.groups} />
        </>
      )}
    </main>
  );
}
