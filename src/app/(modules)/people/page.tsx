"use client";

import { useEffect, useState } from "react";

import { Subheading } from "@/components/catalyst/heading";
import { AgeRangeChart } from "@/components/people/age-range-chart";
import { LoadingProgress } from "@/components/common/loading-progress";

import { PeopleOverview } from "@/lib/types";
import { Text } from "@/components/catalyst/text";

export default function PeoplePage() {
  const [state, setState] = useState<{
    adultCount: number;
    childCount: number;
    isLoading: boolean;
    error: string | null;
  }>({
    adultCount: 0,
    childCount: 0,
    isLoading: true,
    error: null,
  });

  const chartData = {
    labels: ["Adult", "Child"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [state.adultCount, state.childCount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/people/overview");
        if (!data.ok) throw new Error("Failed to fetch overview data");

        const { adultCount, childCount }: PeopleOverview = await data.json();

        setState({
          adultCount,
          childCount,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          adultCount: 0,
          childCount: 0,
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
      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Subheading>Demographics</Subheading>
      </div>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div>
              <Text className="text-center">Age Range</Text>
            </div>
            {state.adultCount == 0 && state.childCount == 0 ? (
              <Text>No data available</Text>
            ) : (
              <AgeRangeChart data={chartData} />
            )}
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div>
              <Text className="text-center">Age Range</Text>
            </div>
            {state.childCount == 0 ? (
              <Text>No data available</Text>
            ) : (
              <AgeRangeChart data={chartData} />
            )}
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div>
              <Text className="text-center">Age Range</Text>
            </div>
            {state.childCount == 0 ? (
              <Text>No data available</Text>
            ) : (
              <AgeRangeChart data={chartData} />
            )}
          </div>
        </dl>
      </div>
    </main>
  );
}
