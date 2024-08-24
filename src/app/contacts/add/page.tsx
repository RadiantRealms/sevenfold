"use client";

import { useEffect, useState } from "react";
import AddContactForm from "@/components/contacts/add-contact-form";
import LoadingComponent from "@/components/common/loading-component";
import ErrorMessage from "@/components/common/error-message";
import { GroupType } from "@/app/types";

export default function AddContactPage() {
  const [state, setState] = useState<{
    groups: GroupType[];
    isLoading: boolean;
    error: string | null;
  }>({
    groups: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("/api/groups");

        if (!res.ok) throw new Error("Failed to fetch groups");

        const data: GroupType[] = await res.json();

        setState({ groups: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          groups: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchGroups();
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
      <AddContactForm groups={state.groups} />
    </main>
  );
}
