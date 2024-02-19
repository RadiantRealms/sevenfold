import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const transactions = await prisma.transaction.findMany();

  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
  const { type, date, amount, description } = await req.json();
  const transaction = await prisma.transaction.create({
    data: {
      type,
      date,
      amount: parseFloat(amount),
      description,
    },
  });

  return NextResponse.json(transaction);
}
