import { Prisma } from "@prisma/client";

export type Person = Prisma.PersonGetPayload<{}>;

export type QueriedPerson = Prisma.PersonGetPayload<{
  include: { Household: { select: { id: true; name: true } } };
}>;

export type PrimaryContact = Prisma.PersonGetPayload<{
  include: { primaryFor: true };
}>;

export type Household = Prisma.HouseholdGetPayload<{
  include: {
    people: true;
    primaryContact: true;
  };
}>;

export type Donation = Prisma.DonationGetPayload<{ include: { Person: true } }>;

export type DashboardDataType = {
  personCount: number;
  last30DaysDonationAmount: number;
  groupCount: number;
  newestMembers: Person[];
};

export type JoinYearEntry = {
  year: number;
  count: number;
};

export type GivingOverview = {
  last30DaysDonationAmount: number;
  totalDonationsAmount: number;
  donorCount: number;
  latestDonations: Donation[];
};

export type Donor = {
  personId: string;
  fullName: string;
  phone: string;
  email: string;
  totalDonations: number;
  totalAmount: number;
  household: Household;
};

export type PeopleOverview = {
  adultCount: number;
  childCount: number;
  maleCount: number;
  femaleCount: number;
  nonbinaryCount: number;
  joinYearSummary: JoinYearEntry[];
};
