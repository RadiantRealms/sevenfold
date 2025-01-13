"use client";

import { useEffect, useState } from "react";

import { Heading, Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { DashboardDataType, Person } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/catalyst/table";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from "@/components/catalyst/dropdown";
import dayjs from "dayjs";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/catalyst/button";
import { Text } from "@/components/catalyst/text";
import { PeopleTable } from "@/components/people/people-table";

export default function DashboardPage() {
  const [state, setState] = useState<{
    personCount: number;
    groupCount: number;
    newestMembers: Person[];
    isLoading: boolean;
    error: string | null;
  }>({
    personCount: 0,
    groupCount: 0,
    newestMembers: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboardData = await fetch("/api/dashboard/");
        if (!dashboardData.ok)
          throw new Error("Failed to fetch dashboard data");

        const { personCount, groupCount, newestMembers }: DashboardDataType =
          await dashboardData.json();

        setState({
          personCount,
          groupCount,
          newestMembers,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState({
          personCount: 0,
          groupCount: 0,
          newestMembers: [],
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
          <Heading>Dashboard</Heading>
        </div>
      </div>
      <div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">Number of Members</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              {state.personCount}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">Number of Groups</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">
              {state.groupCount}
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg px-4 py-5 border border-zinc-950/10 pb-6 dark:border-white/10 sm:p-6">
            <dt className="truncate text-sm font-medium">
              Donations (Last 30 Days)
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight">N/A</dd>
          </div>
        </dl>
      </div>

      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 py-6 dark:border-white/10">
        <Subheading>Newest Members</Subheading>
        <div className="flex">
          <Button href="/people/directory/add">Add person</Button>
        </div>
      </div>
      <PeopleTable people={state.newestMembers} />
    </main>
  );
}
