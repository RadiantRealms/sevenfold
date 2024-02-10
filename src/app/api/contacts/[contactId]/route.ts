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

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const contact = await prisma.contact.delete({
    where: {
      id: params.contactId,
    },
  });

  return NextResponse.json(contact);
}
