import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

interface IParams {
  contactId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const contact = await prisma.contact.findUnique({
    where: {
      id: params.contactId,
    },
  });

  return NextResponse.json(contact);
}
