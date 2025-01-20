"use client";

import { useEffect, useState } from "react";

import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Donor } from "@/lib/types";
import { DonorsTable } from "@/components/giving/donors-table";

export default function ReportsPage() {
  const [state, setState] = useState<{
    donors: Donor[];
    isLoading: boolean;
    error: string | null;
  }>({
    donors: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchDonors() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/giving/reports/summary`
        );

        if (!res.ok) throw new Error("Failed to fetch donor report");

        const { donorReport } = await res.json();

        setState({ donors: donorReport, isLoading: false, error: null });
      } catch (error) {
        setState({
          donors: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchDonors();
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
        <Subheading>Donor Report</Subheading>
      </div>
      <DonorsTable donors={state.donors} />
    </main>
  );
}
