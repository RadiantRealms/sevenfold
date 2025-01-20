"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";
import { HouseholdsTable } from "@/components/people/households-table";

import { Household } from "@/lib/types";

export default function HouseholdsPage() {
  const [state, setState] = useState<{
    households: Household[];
    isLoading: boolean;
    error: string | null;
  }>({
    households: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchHouseholds() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/people/households`
        );

        if (!res.ok) throw new Error("Failed to fetch households");

        const data: Household[] = await res.json();

        setState({ households: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          households: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchHouseholds();
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
        <Subheading>Households</Subheading>
        <div className="flex">
          <Button href="/people/households/add">Add Household</Button>
        </div>
      </div>
      <HouseholdsTable households={state.households} />
    </main>
  );
}
