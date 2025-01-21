"use client";

import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";

import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";
import { Button } from "@/components/catalyst/button";
import { DonationsTable } from "@/components/giving/donations-table";

import { Donation, GivingOverview } from "@/lib/types";

export default function GivingPage() {
  const [state, setState] = useState<{
    last30DaysDonationAmount: number;
    totalDonationsAmount: number;
    donorCount: number;
    latestDonations: Donation[];
    isLoading: boolean;
    error: string | null;
  }>({
    last30DaysDonationAmount: 0,
    totalDonationsAmount: 0,
    donorCount: 0,
    latestDonations: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/giving/overview");

        if (!data.ok) throw new Error("Failed to fetch overview data");

        const {
          last30DaysDonationAmount,
          totalDonationsAmount,
          donorCount,
          latestDonations,
        }: GivingOverview = await data.json();

        setState({
          last30DaysDonationAmount,
          totalDonationsAmount,
          donorCount,
          latestDonations,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          last30DaysDonationAmount: 0,
          totalDonationsAmount: 0,
          donorCount: 0,
          latestDonations: [],
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
        <LoadingProgress />
      </main>
    );

  if (state.error) throw new Error("An error has occured");

  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <div>
          <Subheading>Donation Statistics</Subheading>
        </div>
      </div>
      <div className="border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">
              Donations (Last 30 Days)
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              <NumericFormat
                value={state.last30DaysDonationAmount ?? 0}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                displayType="text"
                renderText={(value) => `$${value}`}
              />
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">
              Donation Total (All Time)
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              <NumericFormat
                value={state.totalDonationsAmount ?? 0}
                thousandsGroupStyle="thousand"
                thousandSeparator=","
                displayType="text"
                renderText={(value) => `$${value}`}
              />
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">Number of Donors</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              {state.donorCount}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 py-6 dark:border-white/10">
        <Subheading>Latest Donations</Subheading>
        <div className="flex">
          <Button href="/giving/donations/add">Add Donation</Button>
        </div>
      </div>
      <DonationsTable donations={state.latestDonations} />
    </main>
  );
}
