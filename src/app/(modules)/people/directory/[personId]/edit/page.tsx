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
import { Text } from "@/components/catalyst/text";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Person } from "@/lib/types";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

export default function EditPersonPage({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const router = useRouter();
  const [state, setState] = useState<{
    person: Person | null;
    isLoading: boolean;
    error: string | null;
  }>({
    person: null,
    isLoading: true,
    error: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = new FormData(event.currentTarget);
      const body = {
        fullName: data.get("full_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        streetAddress: data.get("street_address"),
        city: data.get("city"),
        state: data.get("state"),
        postalCode: data.get("postal_code"),
        gender: data.get("gender"),
        ageRange: data.get("age_range"),
        birthdate: data.get("birthdate"),
        maritalStatus: data.get("marital_status"),
        anniversary: data.get("anniversary"),
        joinDate: data.get("join_date"),
      };

      const res = await fetch(`/api/people/${state.person?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to update person's profile");

      const person: Person = await res.json();

      router.push(`/people/directory/${person.id}`);
    } catch (error) {
      console.error("Error fetching person:", error);
    }
  };

  async function deletePerson(id: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/people/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete person");

      router.push("/people/directory");
    } catch (error: any) {
      console.error("Error deleting person:", error);
    }
  }

  useEffect(() => {
    async function fetchPerson() {
      try {
        const personId = (await params).personId;
        const res = await fetch(`/api/people/${personId}`);

        if (!res.ok) throw new Error("Failed to fetch person with that ID");

        const person: Person = await res.json();

        setState({ person, isLoading: false, error: null });
      } catch (error) {
        setState({
          person: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchPerson();
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
        <form onSubmit={handleSubmit}>
          <Fieldset>
            <Legend>Edit {state.person?.fullName}'s Profile</Legend>
            <Text>Please fill out as completely as possible.</Text>
            <FieldGroup>
              <Field>
                <Label>Full Name</Label>
                <Input
                  required
                  name="full_name"
                  defaultValue={state.person?.fullName ?? ""}
                />
              </Field>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                <Field>
                  <Label>
                    Email Address - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="email"
                    defaultValue={state.person?.email ?? ""}
                  />
                </Field>
                <Field>
                  <Label>
                    Phone Number - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="phone"
                    defaultValue={state.person?.phone ?? ""}
                  />
                </Field>
              </div>

              <Field>
                <Label>
                  Street Address - <span className="italic">Optional</span>
                </Label>
                <Input
                  name="street_address"
                  defaultValue={state.person?.streetAddress ?? ""}
                />
              </Field>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>
                    City - <span className="italic">Optional</span>
                  </Label>
                  <Input name="city" defaultValue={state.person?.city ?? ""} />
                </Field>
                <Field>
                  <Label>
                    State - <span className="italic">Optional</span>
                  </Label>
                  <Select
                    name="state"
                    defaultValue={(state.person?.state as string) ?? ""}
                  >
                    <option value=""></option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </Field>
                <Field>
                  <Label>
                    Postal Code - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="postal_code"
                    defaultValue={state.person?.postalCode ?? ""}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>Gender</Label>
                  <Select
                    required
                    name="gender"
                    defaultValue={(state.person?.gender as string) ?? ""}
                  >
                    <option value=""></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NONBINARY">Nonbinary</option>
                  </Select>
                </Field>
                <Field>
                  <Label>Age Range</Label>
                  <Select
                    required
                    name="age_range"
                    defaultValue={(state.person?.ageRange as string) ?? ""}
                  >
                    <option value=""></option>
                    <option value="ADULT">Adult</option>
                    <option value="CHILD">Child</option>
                  </Select>
                </Field>
                <Field>
                  <Label>
                    Birthdate - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="birthdate"
                    type="date"
                    defaultValue={state.person?.birthdate ?? ""}
                  />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>
                    Marital Status - <span className="italic">Optional</span>
                  </Label>
                  <Select
                    name="marital_status"
                    defaultValue={(state.person?.maritalStatus as string) ?? ""}
                  >
                    <option value=""></option>
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="WIDOWED">Widowed</option>
                  </Select>
                </Field>
                <Field>
                  <Label>
                    Anniversary - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="anniversary"
                    type="date"
                    defaultValue={state.person?.anniversary ?? ""}
                  />
                </Field>
                <Field>
                  <Label>
                    Join Date - <span className="italic">Optional</span>
                  </Label>
                  <Input
                    name="join_date"
                    type="date"
                    defaultValue={state.person?.joinDate ?? ""}
                  />
                </Field>
              </div>
            </FieldGroup>
          </Fieldset>

          <div className="flex w-full flex-wrap items-end justify-end gap-4 py-6">
            <Button outline href={`/people/directory/${state.person?.id}`}>
              Cancel
            </Button>
            <Button color="red" onClick={() => deletePerson(state.person?.id!)}>
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
      </div>
    </main>
  );
}
