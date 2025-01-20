"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Donation, Donor, Person } from "@/lib/types";
import { PeopleTable } from "@/components/people/people-table";
import { DonationsTable } from "@/components/giving/donations-table";

export default function DonorHistoryPAge({
  params,
}: {
  params: Promise<{ donorId: string }>;
}) {
  const [state, setState] = useState<{
    history: Donation[];
    person: Person | null;
    isLoading: boolean;
    error: string | null;
  }>({
    history: [],
    person: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchDonationHistory() {
      try {
        const donorId = (await params).donorId;
        const res = await fetch(`/api/giving/reports/donors/${donorId}`);

        if (!res.ok) throw new Error("Failed to fetch donor with that ID");

        const { donorSummary, person } = await res.json();

        setState({
          history: donorSummary,
          person,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          history: [],
          person: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchDonationHistory();
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
        <Subheading>{state.person?.fullName}'s Donations</Subheading>
      </div>
      <DonationsTable donations={state.history} />
    </main>
  );
}
