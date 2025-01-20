"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/catalyst/button";
import {
  Field,
  FieldGroup,
  Fieldset,
  Legend,
} from "@/components/catalyst/fieldset";
import { Select } from "@/components/catalyst/select";
import { Text, TextLink } from "@/components/catalyst/text";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Household, PrimaryContact } from "@/lib/types";

export default function AddPersonToHouseholdPage({
  params,
}: {
  params: Promise<{ householdId: string }>;
}) {
  const router = useRouter();
  const [state, setState] = useState<{
    household: Household | null;
    people: PrimaryContact[];
    isLoading: boolean;
    error: string | null;
  }>({
    household: null,
    people: [],
    isLoading: true,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setState((prevState) => ({ ...prevState, error: null })); // Reset error state

      const data = new FormData(event.currentTarget);
      const contactId = data.get("contact");

      if (!contactId) {
        throw new Error("Please select a valid contact.");
      }

      const res = await fetch(`/api/people/${contactId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          addToHousehold: true,
          householdId: state.household?.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to add contact to household");

      router.push(`/people/households/${state.household?.id}`);
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: (error as Error).message,
      }));
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const householdId = (await params).householdId;

        const [householdRes, peopleRes] = await Promise.all([
          fetch(`/api/people/households/${householdId}`),
          fetch("/api/people"),
        ]);

        if (!householdRes.ok) throw new Error("Failed to fetch household");
        if (!peopleRes.ok) throw new Error("Failed to fetch people");

        const household: Household = await householdRes.json();
        const people: PrimaryContact[] = await peopleRes.json();

        setState({ household, people, isLoading: false, error: null });
      } catch (error: any) {
        setState({
          household: null,
          people: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchData();
  }, [params]);

  if (state.isLoading) {
    return (
      <main>
        <LoadingProgress />
      </main>
    );
  }

  if (state.error) {
    console.error(state.error);
    return (
      <main>
        <Text>{state.error}</Text>
      </main>
    );
  }

  const availablePeople = state.people.filter(
    (person) => !person.primaryFor?.id && !person.householdId // People not assigned to a household or primary contact
  );

  return (
    <main>
      <div className="pb-6">
        {availablePeople.length === 0 ? (
          <>
            <Subheading>Add household</Subheading>
            <Text>
              All of your contacts either already belong to a household or are
              the primary contact for one.{" "}
              <TextLink href="/people/directory/add">Add people</TextLink> or
              return to{" "}
              <TextLink href="/people/directory">the directory</TextLink>.
            </Text>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <Fieldset>
              <Legend>Add Person to Household</Legend>
              <Text>Please select a person to add to the household.</Text>
              <FieldGroup>
                <Field>
                  <Select required name="contact">
                    <option value="">Select a contact</option>
                    {availablePeople.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.fullName}
                      </option>
                    ))}
                  </Select>
                </Field>
              </FieldGroup>
            </Fieldset>

            <div className="flex w-full flex-wrap items-end justify-end gap-4 py-6">
              <Button
                outline
                href={`/people/households/${state.household?.id}`}
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>

            {state.error && (
              <div className="flex w-full flex-wrap items-end justify-end">
                <Text>{state.error}</Text>
              </div>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
