import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const contacts = await prisma.contact.findMany();

  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const { firstName, lastName } = await req.json();
  const contact = await prisma.contact.create({
    data: {
      firstName,
      lastName,
    },
  });

  return NextResponse.json(contact);
}
