import { Prisma, Group, Transaction } from "@prisma/client";

export type ContactType = Prisma.ContactGetPayload<{
  include: { Group: true };
}>;

export type GroupType = Group;

export type TransactionType = Transaction;
