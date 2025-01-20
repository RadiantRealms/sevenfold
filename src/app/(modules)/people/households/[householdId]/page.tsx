"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/catalyst/button";
import { Subheading } from "@/components/catalyst/heading";
import { Text, TextLink } from "@/components/catalyst/text";
import { LoadingProgress } from "@/components/common/loading-progress";
import { HouseholdPeopleTable } from "@/components/people/household-people-table";

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

  async function removePersonFromHousehold(personId: string) {
    try {
      const res = await fetch(`/api/people/${personId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ removeFromHousehold: true }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(
          error.error || "Failed to remove person from household"
        );
      }

      setState((prevState) => {
        if (!prevState.household) return prevState;

        return {
          ...prevState,
          household: {
            ...prevState.household,
            people: prevState.household.people.filter(
              (person) => person.id !== personId
            ),
          },
        };
      });
    } catch (error: any) {
      console.error("Error:", error.message);
      throw error;
    }
  }

  useEffect(() => {
    async function fetchHousehold() {
      try {
        const householdId = (await params).householdId;
        const res = await fetch(`/api/people/households/${householdId}`);

        if (!res.ok) throw new Error("Failed to fetch household with that ID");

        const household: Household = await res.json();

        setState({ household, isLoading: false, error: null });
      } catch (error: any) {
        console.error("Error:", error.message);
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
        <div className="flex gap-4 mt-4 sm:mt-0">
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
      <HouseholdPeopleTable
        household={state.household}
        removePerson={removePersonFromHousehold}
      />
      <div className="flex w-full flex-wrap items-end justify-between py-6">
        <Button outline href="/people/households">
          <ArrowLeftIcon />
          Back to Households
        </Button>
      </div>
    </main>
  );
}
