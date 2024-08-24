import { Prisma, Transaction } from "@prisma/client";

export type ContactType = Prisma.ContactGetPayload<{
  include: { Group: true };
}>;

export type GroupType = Prisma.GroupGetPayload<{
  include: { contacts: true };
}>;

export type TransactionType = Transaction;

export type DashboardDataType = {
  contactCount: number;
  groupCount: number;
};
