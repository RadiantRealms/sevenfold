"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";
import { DonationsTable } from "@/components/giving/donations-table";

import { Donation } from "@/lib/types";

export default function DonationsPage() {
  const [state, setState] = useState<{
    donations: Donation[];
    isLoading: boolean;
    error: string | null;
  }>({
    donations: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchDonations() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/giving/donations`
        );

        if (!res.ok) throw new Error("Failed to fetch donations");

        const data: Donation[] = await res.json();

        setState({ donations: data, isLoading: false, error: null });
      } catch (error) {
        setState({
          donations: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchDonations();
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
        <Subheading>Donations</Subheading>
        <div className="flex">
          <Button href="/giving/donations/add">Add Donation</Button>
        </div>
      </div>
      <DonationsTable donations={state.donations} />
    </main>
  );
}
