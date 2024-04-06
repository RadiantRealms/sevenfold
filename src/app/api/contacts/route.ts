import { NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";

export const GET = withApiAuthRequired(async function (req) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const contacts = await prisma.contact.findMany({
      where: {
        organizationId,
      },
    });

    return NextResponse.json(contacts);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const POST = withApiAuthRequired(async function (req: Request) {
  try {
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
      groupId,
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
        groupId,
      },
    });

    return NextResponse.json(contact);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
