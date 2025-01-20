"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/components/catalyst/description-list";
import { Button } from "@/components/catalyst/button";
import { TextLink } from "@/components/catalyst/text";

import { Donation } from "@/lib/types";
import { NumericFormat } from "react-number-format";
import { LoadingProgress } from "@/components/common/loading-progress";
import { Subheading } from "@/components/catalyst/heading";

export default function DonationPage({
  params,
}: {
  params: Promise<{ donationId: string }>;
}) {
  const [state, setState] = useState<{
    donation: Donation | null;
    isLoading: boolean;
    error: string | null;
  }>({
    donation: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchDonation() {
      try {
        const donationId = (await params).donationId;
        const res = await fetch(`/api/giving/donations/${donationId}`);

        if (!res.ok) throw new Error("Failed to fetch donation with that ID");

        const donation: Donation = await res.json();

        setState({ donation, isLoading: false, error: null });
      } catch (error) {
        setState({
          donation: null,
          isLoading: false,
          error: (error as Error).message,
        });
      }
    }

    fetchDonation();
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
        <Subheading>
          {state.donation?.Person?.fullName} gave{" "}
          {state.donation?.amount ? (
            <NumericFormat
              value={`${state.donation.amount}`}
              thousandsGroupStyle="thousand"
              thousandSeparator=","
              displayType="text"
              decimalScale={2}
              fixedDecimalScale
              renderText={(value) => `$${value}`}
            />
          ) : (
            "N/A"
          )}{" "}
          on{" "}
          {state.donation?.date
            ? dayjs(state.donation.date, "YYYY-MM-DD").format("MMMM DD, YYYY")
            : "N/A"}
        </Subheading>
        <div className="flex">
          <Button href={`/giving/donations/${state.donation?.id}/edit`}>
            Edit Donation
          </Button>
        </div>
      </div>
      <DescriptionList>
        <DescriptionTerm>Date</DescriptionTerm>
        <DescriptionDetails>
          {state.donation?.date
            ? dayjs(state.donation.date, "YYYY-MM-DD").format("MMMM DD, YYYY")
            : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Amount</DescriptionTerm>
        <DescriptionDetails>
          {state.donation?.amount ? (
            <NumericFormat
              value={`${state.donation.amount}`}
              thousandsGroupStyle="thousand"
              thousandSeparator=","
              displayType="text"
              decimalScale={2}
              fixedDecimalScale
              renderText={(value) => `$${value}`}
            />
          ) : (
            "N/A"
          )}
        </DescriptionDetails>

        <DescriptionTerm>Fund</DescriptionTerm>
        <DescriptionDetails>
          {state.donation?.fund &&
            state.donation?.fund[0] +
              state.donation?.fund.slice(1).toLowerCase()}
        </DescriptionDetails>

        <DescriptionTerm>Donor</DescriptionTerm>
        <DescriptionDetails>
          <TextLink href={`/people/directory/${state.donation?.personId}`}>
            {state.donation?.Person?.fullName}
          </TextLink>
        </DescriptionDetails>

        <DescriptionTerm>Created At</DescriptionTerm>
        <DescriptionDetails>
          {state.donation?.createdAt
            ? dayjs(state.donation.createdAt, "YYYY-MM-DD").format(
                "MMMM DD, YYYY"
              )
            : "N/A"}
        </DescriptionDetails>

        <DescriptionTerm>Logged By</DescriptionTerm>
        <DescriptionDetails>{state.donation?.loggedBy}</DescriptionDetails>
      </DescriptionList>
      <div className="flex w-full flex-wrap items-end justify-between py-6">
        <Button outline href="/giving/donations">
          <ArrowLeftIcon />
          Back to Donation List
        </Button>
      </div>
    </main>
  );
}
