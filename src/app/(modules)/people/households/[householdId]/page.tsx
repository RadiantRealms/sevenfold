"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";
import { PeopleTable } from "@/components/people/people-table";
import { Text, TextLink } from "@/components/catalyst/text";

import { Household } from "@/lib/types";

export default function HouseholdPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const [state, setState] = useState<{
    household: Household | null;
    isLoading: boolean;
    error: string | null;
  }>({
    household: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchHousehold() {
      try {
        const householdId = (await params).householdId;
        const res = await fetch(`/api/people/households/${householdId}`);

        if (!res.ok) throw new Error("Failed to fetch household with that ID");

        const household: Household = await res.json();

        setState({ household, isLoading: false, error: null });
      } catch (error) {
        setState({
          household: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchHousehold();
  }, []);

  if (state.isLoading)
    return (
      <main>
        <LoadingProgress />
      </main>
    );

  if (!state.household) {
    notFound();
  }

  if (state.error) {
    console.error(state.error);
    throw new Error(state.error);
  }

  return (
    <main>
      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <div>
          <Subheading>{state.household?.name}</Subheading>
          <Text>
            Primary Contact:{" "}
            <TextLink
              href={`/people/directory/${state.household.primaryContactId}`}
            >
              {state.household.primaryContact?.fullName}
            </TextLink>
          </Text>
        </div>
        <div className="flex gap-4">
          <Button
            outline
            href={`/people/households/${state.household.id}/edit`}
          >
            Edit Household
          </Button>
          <Button href={`/people/households/${state.household.id}/add`}>
            Add Person to Household
          </Button>
        </div>
      </div>
      <PeopleTable people={state.household.people} />
      <div className="flex w-full flex-wrap items-end justify-between py-6">
        <Button outline href="/people/households">
          <ArrowLeftIcon />
          Back to Households
        </Button>
      </div>
    </main>
  );
}
