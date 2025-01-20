"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/catalyst/button";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/catalyst/fieldset";
import { Input } from "@/components/catalyst/input";
import { Select } from "@/components/catalyst/select";
import { Text, TextLink } from "@/components/catalyst/text";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Household, PrimaryContact } from "@/lib/types";

export default function EditHouseholdPage({
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
      const data = new FormData(event.currentTarget);
      const body = {
        name: data.get("household_name"),
        primaryContactId: data.get("primary_contact"),
      };

      const res = await fetch(`/api/people/households/${state.household?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update household");

      const household: Household = await res.json();

      router.push(`/people/households/${household.id}`);
    } catch (error) {
      setState({ ...state, error: (error as Error).message });
    }
  };

  async function deleteHousehold(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/people/households/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete household");

      router.push("/people/households");
    } catch (error: any) {
      console.error("Error deleting household:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const householdId = (await params).householdId;

        const householdRes = await fetch(
          `/api/people/households/${householdId}`
        );

        if (!householdRes.ok) throw new Error("Failed to fetch household");

        const household: Household = await householdRes.json();

        const peopleRes = await fetch("/api/people");

        if (!peopleRes.ok) throw new Error("Failed to fetch people");

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
      <div className="pb-6">
        {state.people.length == 0 && (
          <>
            <Subheading>Add household</Subheading>
            <Text>
              Please{" "}
              <TextLink href="/people/directory/add">add people</TextLink> to
              your directory before creating a household.
            </Text>
          </>
        )}
        {state.people.length > 0 && (
          <>
            <form onSubmit={handleSubmit}>
              <Fieldset>
                <Legend>Edit Household</Legend>
                <Text>Please fill out as completely as possible.</Text>
                <FieldGroup>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                    <Field>
                      <Label>Household Name</Label>
                      <Input
                        required
                        name="household_name"
                        defaultValue={state.household?.name}
                      />
                    </Field>

                    <Field>
                      <Label>Primary Contact</Label>
                      <Select
                        required
                        name="primary_contact"
                        defaultValue={state.household?.primaryContactId || ""}
                      >
                        <option value="">Select a contact</option>

                        {state.people.length > 0 ? (
                          state.people.some(
                            (person) =>
                              person.primaryFor == null ||
                              person.primaryFor.id === state.household?.id
                          ) ? (
                            state.people
                              .filter(
                                (person) =>
                                  person.primaryFor == null ||
                                  person.primaryFor.id === state.household?.id
                              )
                              .map((person) => (
                                <option key={person.id} value={person.id}>
                                  {person.fullName}
                                </option>
                              ))
                          ) : (
                            <option disabled>No contacts available</option>
                          )
                        ) : (
                          <option disabled>No people available</option>
                        )}
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>
              </Fieldset>

              <div className="flex w-full flex-wrap items-end justify-end gap-4 py-6">
                <Button outline href="/people/households">
                  Cancel
                </Button>
                <Button
                  color="red"
                  onClick={() => deleteHousehold(state.household?.id!)}
                >
                  Delete
                </Button>
                <Button type="submit">Save</Button>
              </div>

              {state.error && (
                <div className="flex w-full flex-wrap items-end justify-end">
                  <Text>{state.error}</Text>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </main>
  );
}
