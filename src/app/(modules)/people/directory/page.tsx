"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Person } from "@/lib/types";
import { PeopleTable } from "@/components/people/people-table";

export default function DirectoryPage() {
  const [state, setState] = useState<{
    people: Person[];
    isLoading: boolean;
    error: string | null;
  }>({
    people: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/people`
        );

        if (!res.ok) throw new Error("Failed to fetch people");

        const data: Person[] = await res.json();

        setState({ people: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          people: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchPeople();
  }, []);

  if (state.isLoading)
    return (
      <main>
        <LoadingProgress />
      </main>
    );

  if (state.error) {
    console.error(state.error);
    throw new Error(state.error);
  }

  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Subheading>Directory</Subheading>
        <div className="flex">
          <Button href="/people/directory/add">Add Person</Button>
        </div>
      </div>
      <PeopleTable people={state.people} />
    </main>
  );
}
