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
        console.log(donation);
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

        <DescriptionTerm>Fee</DescriptionTerm>
        <DescriptionDetails>$4.79 USD</DescriptionDetails>

        <DescriptionTerm>Net</DescriptionTerm>
        <DescriptionDetails>$1,955.00</DescriptionDetails>
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
