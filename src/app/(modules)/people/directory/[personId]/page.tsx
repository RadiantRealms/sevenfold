"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import { Button } from "@/components/catalyst/button";
import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/catalyst/description-list";
import { Subheading } from "@/components/catalyst/heading";
import { LoadingProgress } from "@/components/common/loading-progress";

import { Person } from "@/lib/types";

export default function PersonPage({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const [state, setState] = useState<{
    person: Person | null;
    isLoading: boolean;
    error: string | null;
  }>({
    person: null,
    isLoading: true,
    error: null,
  });

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
      <div className="flex w-full flex-wrap items-end justify-between border-b border-zinc-950/10 pb-6 dark:border-white/10">
        <Subheading>{state.person?.fullName}</Subheading>
        <div className="flex gap-4">
          <Button outline href={`/giving/reports/donors/${state.person?.id}`}>
            View Donations
          </Button>
          <Button href={`/people/directory/${state.person?.id}/edit`}>
            Edit Profile
          </Button>
        </div>
      </div>
      <DescriptionList>
        <DescriptionTerm>Full Name</DescriptionTerm>
        <DescriptionDetails>{state.person?.fullName}</DescriptionDetails>

        <DescriptionTerm>Age Range</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.ageRange &&
            state.person?.ageRange[0] +
              state.person?.ageRange.slice(1).toLowerCase()}
        </DescriptionDetails>

        <DescriptionTerm>Gender</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.gender &&
            state.person?.gender[0] +
              state.person?.gender.slice(1).toLowerCase()}
        </DescriptionDetails>

        <DescriptionTerm>Email Address</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.email ? state.person.email : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Phone Number</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.phone ? state.person.phone : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Address</DescriptionTerm>
        <DescriptionDetails>
          {!state.person?.streetAddress &&
            !state.person?.city &&
            !state.person?.state &&
            !state.person?.postalCode &&
            "N/A"}
          <div>{state.person?.streetAddress}</div>
          <div>
            {state.person?.city}
            {state.person?.city && state.person?.state ? ", " : false}
            {state.person?.state} {state.person?.postalCode}
          </div>
        </DescriptionDetails>

        <DescriptionTerm>Birthdate</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.birthdate
            ? dayjs(state.person.birthdate, "YYYY-MM-DD").format(
                "MMMM DD, YYYY"
              )
            : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Marital Status</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.maritalStatus
            ? state.person?.maritalStatus[0] +
              state.person?.maritalStatus.slice(1).toLowerCase()
            : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Anniversary</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.anniversary
            ? dayjs(state.person.anniversary, "YYYY-MM-DD").format(
                "MMMM DD, YYYY"
              )
            : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Join Date</DescriptionTerm>
        <DescriptionDetails>
          {state.person?.joinDate
            ? dayjs(state.person.joinDate, "YYYY-MM-DD").format("MMMM DD, YYYY")
            : "N/A"}
        </DescriptionDetails>
      </DescriptionList>
      <div className="flex w-full flex-wrap items-end justify-between py-6">
        <Button outline href="/people/directory">
          <ArrowLeftIcon />
          Back to Directory
        </Button>
      </div>
    </main>
  );
}
