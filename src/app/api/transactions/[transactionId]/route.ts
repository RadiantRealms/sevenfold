import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../../../lib/prisma";

export const GET = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const transaction = await prisma.transaction.findUnique({
      where: {
        organizationId,
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

export const PUT = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const { type, date, amount, description } = await req.json();
    const transaction = await prisma.transaction.update({
      where: {
        id: params?.transactionId as string,
      },
      data: {
        organizationId,
        type,
        date,
        amount: Math.round(amount * 100) / 100,
        description,
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
