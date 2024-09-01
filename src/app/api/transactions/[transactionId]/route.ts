import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";
import { transactionSchema } from "@/lib/schemas/transaction";

export const GET = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const transaction = await prisma.transaction.findUnique({
      where: {
        organizationId,
        id: params?.transactionId as string,
      },
      include: {
        Contact: true,
      },
    });

    if (!transaction)
      throw new Error("Could not fetch transaction with that ID");

    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const PUT = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const transactionData = transactionSchema.parse(await req.json());
    const transaction = await prisma.transaction.update({
      where: {
        id: params?.transactionId as string,
        organizationId,
      },
      data: {
        ...transactionData,
        amount:
          transactionData.type == "EXPENSE"
            ? -transactionData.amount
            : transactionData.amount,
      },
    });

    if (!transaction) throw new Error("Error updating transaction");

    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const DELETE = withApiAuthRequired(async function (req, { params }) {
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: params?.transactionId as string,
      },
    });

    return NextResponse.json(transaction);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
