import { NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";

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
  const { type, date, amount, description } = await req.json();
  const transaction = await prisma.transaction.create({
    data: {
      organizationId,
      type,
      date,
      amount: parseFloat(amount),
      description,
    },
  });

  return NextResponse.json(transaction);
});
