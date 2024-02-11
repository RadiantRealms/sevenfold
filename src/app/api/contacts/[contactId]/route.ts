import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

interface IParams {
  contactId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
  });

  return NextResponse.json(contact);
}

export async function PUT(req: Request, { params }: { params: IParams }) {
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
      id: params.contactId,
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
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const contact = await prisma.contact.delete({
    where: {
      id: params.contactId,
    },
  });

  return NextResponse.json(contact);
}
