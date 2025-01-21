"use client";

import { useEffect, useState } from "react";

import { Subheading } from "@/components/catalyst/heading";
import { Text } from "@/components/catalyst/text";
import { LoadingProgress } from "@/components/common/loading-progress";
import { DoughnutChart } from "@/components/common/doughnut-chart";
import { ScatterChart } from "@/components/common/scatter-chart";

import { JoinYearEntry, PeopleOverview } from "@/lib/types";

export default function PeoplePage() {
  const [state, setState] = useState<{
    adultCount: number;
    childCount: number;
    maleCount: number;
    femaleCount: number;
    nonbinaryCount: number;
    joinYearSummary: JoinYearEntry[];
    isLoading: boolean;
    error: string | null;
  }>({
    adultCount: 0,
    childCount: 0,
    maleCount: 0,
    femaleCount: 0,
    nonbinaryCount: 0,
    joinYearSummary: [],
    isLoading: true,
    error: null,
  });

  const ageData = {
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

  const genderData = {
    labels: ["Male", "Female", "Nonbinary"],
    datasets: [
      {
        id: 1,
        label: "",
        data: [state.maleCount, state.femaleCount, state.nonbinaryCount],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const joinYearChartOptions = {
    aspectRatio: 1,
    scales: {
      x: {
        min: 1900,
        grid: {
          color: "#6b7280",
        },
        ticks: {
          callback: (value: any) => value.toString(),
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#6b7280",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const x = context.raw.x;
            const y = context.raw.y;
            return `Year: ${x}, People: ${y}`;
          },
        },
      },
    },
  };

  const joinYearData = {
    datasets: [
      {
        label: "People",
        data: state.joinYearSummary.map((item) => ({
          x: item.year,
          y: item.count,
        })),
        backgroundColor: "rgba(0, 179, 33, 0.2)",
        borderColor: "rgba(0, 179, 33, 1)",
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/api/people/overview");
        if (!data.ok) throw new Error("Failed to fetch overview data");

        const {
          adultCount,
          childCount,
          maleCount,
          femaleCount,
          nonbinaryCount,
          joinYearSummary,
        }: PeopleOverview = await data.json();

        setState({
          adultCount,
          childCount,
          maleCount,
          femaleCount,
          nonbinaryCount,
          joinYearSummary,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          adultCount: 0,
          childCount: 0,
          maleCount: 0,
          femaleCount: 0,
          nonbinaryCount: 0,
          joinYearSummary: [],
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
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div className="text-center truncate text-sm font-medium">Age</div>
            <div className="mt-1 flex justify-center items-center">
              {!state.adultCount && !state.childCount ? (
                <Text>No data available</Text>
              ) : (
                <DoughnutChart data={ageData} />
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div className="text-center truncate text-sm font-medium">
              Gender
            </div>
            <div className="mt-1 flex justify-center items-center">
              {!state.maleCount &&
              !state.femaleCount &&
              !state.nonbinaryCount ? (
                <Text>No data available</Text>
              ) : (
                <DoughnutChart data={genderData} />
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <div className="text-center truncate text-sm font-medium">
              Join Year
            </div>
            <div className="mt-1 flex justify-center items-center">
              {state.joinYearSummary.length == 0 ? (
                <Text>No data available</Text>
              ) : (
                <ScatterChart
                  options={joinYearChartOptions}
                  data={joinYearData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
