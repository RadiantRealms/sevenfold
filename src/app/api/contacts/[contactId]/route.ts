import { NextResponse } from "next/server";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../../../lib/prisma";

export const GET = withApiAuthRequired(async function (req, { params }) {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id: params?.contactId as string,
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

export const PUT = withApiAuthRequired(async function (req, { params }) {
  try {
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
    const contact = await prisma.contact.update({
      where: {
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

export const DELETE = withApiAuthRequired(async function (req, { params }) {
  try {
    const contact = await prisma.contact.delete({
      where: {
        id: params?.contactId as string,
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
