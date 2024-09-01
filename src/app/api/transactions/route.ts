import { NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";
import { transactionSchema } from "@/lib/schemas/transaction";

export const GET = withApiAuthRequired(async function (req) {
  const session = await getSession();
  const organizationId = session?.user.org_id;
  const transactions = await prisma.transaction.findMany({
    where: {
      organizationId,
    },
    include: {
      Contact: true,
    },
  });

  return NextResponse.json(transactions);
});

export const POST = withApiAuthRequired(async function (req) {
  const session = await getSession();
  const organizationId = session?.user.org_id;
  const transactionData = transactionSchema.parse(await req.json());
  const transaction = await prisma.transaction.create({
    data: {
      ...transactionData,
      organizationId,
      amount:
        transactionData.type == "EXPENSE"
          ? -transactionData.amount
          : transactionData.amount,
    },
  });

  return NextResponse.json(transaction);
});
