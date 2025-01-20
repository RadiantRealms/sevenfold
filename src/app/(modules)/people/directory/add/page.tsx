"use client";

import { useState } from "react";
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

export default function AddPersonPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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

      const res = await fetch("/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create new person");

      const person: Person = await res.json();

      router.push(`/people/directory/${person.id}`);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <main>
      <div className="pb-6">
        <form onSubmit={handleSubmit}>
          <Fieldset>
            <Legend>Add Person to Directory</Legend>
            <Text>Please fill out as completely as possible.</Text>
            <FieldGroup>
              <Field>
                <Label>Full Name</Label>
                <Input required name="full_name" />
              </Field>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                <Field>
                  <Label>
                    Email Address - <span className="italic">Optional</span>
                  </Label>
                  <Input name="email" />
                </Field>
                <Field>
                  <Label>
                    Phone Number - <span className="italic">Optional</span>
                  </Label>
                  <Input name="phone" />
                </Field>
              </div>

              <Field>
                <Label>
                  Street Address - <span className="italic">Optional</span>
                </Label>
                <Input name="street_address" />
              </Field>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>
                    City - <span className="italic">Optional</span>
                  </Label>
                  <Input name="city" />
                </Field>
                <Field>
                  <Label>
                    State - <span className="italic">Optional</span>
                  </Label>
                  <Select name="state">
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
                  <Input name="postal_code" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>Gender</Label>
                  <Select required name="gender">
                    <option value=""></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="NONBINARY">Nonbinary</option>
                  </Select>
                </Field>
                <Field>
                  <Label>Age Range</Label>
                  <Select required name="age_range">
                    <option value=""></option>
                    <option value="ADULT">Adult</option>
                    <option value="CHILD">Child</option>
                  </Select>
                </Field>
                <Field>
                  <Label>
                    Birthdate - <span className="italic">Optional</span>
                  </Label>
                  <Input name="birthdate" type="date" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                <Field>
                  <Label>
                    Marital Status - <span className="italic">Optional</span>
                  </Label>
                  <Select name="marital_status">
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
                  <Input name="anniversary" type="date" />
                </Field>
                <Field>
                  <Label>
                    Join Date - <span className="italic">Optional</span>
                  </Label>
                  <Input name="join_date" type="date" />
                </Field>
              </div>
            </FieldGroup>
          </Fieldset>

          <div className="flex w-full flex-wrap items-end justify-end gap-4 py-6">
            <Button outline href="/people/directory">
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>

          {error && (
            <div className="flex w-full flex-wrap items-end justify-end">
              <Text>{error}</Text>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
