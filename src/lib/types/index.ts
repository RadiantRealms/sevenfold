import { Prisma } from "@prisma/client";

export type Person = Prisma.PersonGetPayload<{}>;

export type PrimaryContact = Prisma.PersonGetPayload<{
  include: { primaryFor: true };
}>;

export type Household = Prisma.HouseholdGetPayload<{
  include: {
    people: true;
    primaryContact: true;
  };
}>;

export type PeopleOverview = {
  adultCount: number;
  childCount: number;
};

export type DashboardDataType = {
  personCount: number;
  groupCount: number;
  newestMembers: Person[];
};
