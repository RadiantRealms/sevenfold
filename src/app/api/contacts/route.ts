import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";

export async function GET(req: Request) {
  const session = await getSession();
  const organizationId = session?.user.org_id;
  const contacts = await prisma.contact.findMany({
    where: {
      organizationId,
    },
  });

  return NextResponse.json(contacts);
}

export async function POST(req: Request) {
  const session = await getSession();
  const organizationId = session?.user.org_id;
  const {
    firstName,
    middleName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
    phone,
    email,
  } = await req.json();
  const contact = await prisma.contact.create({
    data: {
      organizationId,
      firstName,
      middleName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      phone,
      email,
    },
  });

  return NextResponse.json(contact);
}
