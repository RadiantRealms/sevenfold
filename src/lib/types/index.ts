import { Prisma } from "@prisma/client";

export type ContactType = Prisma.ContactGetPayload<{
  include: { Group: true; transactions: true };
}>;

export type GroupType = Prisma.GroupGetPayload<{
  include: { contacts: true };
}>;

export type TransactionType = Prisma.TransactionGetPayload<{
  include: { Contact: true };
}>;

export type ContactProfileTransactionType = Prisma.TransactionGetPayload<{}>;

export type DashboardDataType = {
  contactCount: number;
  groupCount: number;
};
