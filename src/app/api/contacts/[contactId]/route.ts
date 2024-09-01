import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";

export const GET = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const contact = await prisma.contact.findUnique({
      where: {
        organizationId,
        id: params?.contactId as string,
      },
      include: {
        Group: true,
        transactions: true,
      },
    });

    if (!contact) {
      throw new Error("Contact not found");
    }

    return NextResponse.json(contact);
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
    const contact = await prisma.contact.update({
      where: {
        organizationId,
        id: params?.contactId as string,
      },
      data: {
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
        groupId: groupId === "" ? null : groupId,
      },
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact could not be updated." },
        { status: 400 }
      );
    }

    return NextResponse.json(contact);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const DELETE = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const contact = await prisma.contact.delete({
      where: {
        organizationId,
        id: params?.contactId as string,
      },
    });

    if (!contact) {
      return NextResponse.json(
        { error: "Contact could not be deleted." },
        { status: 400 }
      );
    }

    return NextResponse.json(contact);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
