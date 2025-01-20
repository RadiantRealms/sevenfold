"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CurrencyDollarIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/catalyst/button";
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/components/catalyst/fieldset";
import { Input, InputGroup } from "@/components/catalyst/input";
import { Select } from "@/components/catalyst/select";
import { Text, TextLink } from "@/components/catalyst/text";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Donation, Person } from "@/lib/types";

export default function AddDonationPAge() {
  const router = useRouter();
  const [state, setState] = useState<{
    people: Person[];
    isLoading: boolean;
    error: string | null;
  }>({
    people: [],
    isLoading: true,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const body = {
        date: data.get("date"),
        amount: data.get("amount"),
        fund: data.get("fund"),
        personId: data.get("donor"),
      };

      const res = await fetch("/api/giving/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to record donation");

      const donation: Donation = await res.json();

      router.push(`/giving/donations/${donation.id}`);
    } catch (error) {
      setState({ ...state, error: (error as Error).message });
    }
  };

  useEffect(() => {
    async function fetchPeople() {
      try {
        const res = await fetch("/api/people");

        if (!res.ok) throw new Error("Failed to fetch people");

        const people: Person[] = await res.json();

        setState({ people, isLoading: false, error: null });
      } catch (error: any) {
        setState({
          people: [],
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchPeople();
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
            <Subheading className="mb-1">Add Donation</Subheading>
            <Text>
              Please{" "}
              <TextLink href="/people/directory/add">add people</TextLink> to
              your directory before recording a donation.
            </Text>
          </>
        )}
        {state.people.length > 0 && (
          <>
            <form onSubmit={handleSubmit}>
              <Fieldset>
                <Legend>Add Donation</Legend>
                <Text>Please fill out to the best of your ability.</Text>
                <FieldGroup>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                    <Field>
                      <Label>Date</Label>
                      <Input required type="date" name="date" />
                    </Field>

                    <Field>
                      <Label>Amount</Label>
                      <InputGroup>
                        <CurrencyDollarIcon />
                        <Input
                          required
                          type="number"
                          min="0"
                          step="0.01"
                          name="amount"
                        />
                      </InputGroup>
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                    <Field>
                      <Label>Fund</Label>
                      <Select required name="fund">
                        <option value="">Select a fund</option>
                        <option value="MISSION">Mission</option>
                        <option value="TITHES">Tithes</option>
                      </Select>
                    </Field>

                    <Field>
                      <Label>Donor</Label>
                      <Select required name="donor">
                        <option value="">Select a donor</option>
                        {state.people
                          .sort(
                            (a, b) =>
                              a.fullName.charCodeAt(0) -
                              b.fullName.charCodeAt(0)
                          )
                          .map((person) => (
                            <option key={person.id} value={person.id}>
                              {person.fullName}
                            </option>
                          ))}
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>
              </Fieldset>

              <div className="flex w-full flex-wrap items-end justify-end gap-4 py-6">
                <Button outline href="/giving/donations">
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
          </>
        )}
      </div>
    </main>
  );
}
