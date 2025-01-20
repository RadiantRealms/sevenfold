import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ donorId: string }> }
) {
  try {
    const donorId = (await params).donorId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;

    const person = await prisma.person.findUnique({
      where: {
        organizationId,
        id: donorId,
      },
    });

    if (!person) throw new Error("Person with that ID does not exist");

    const donorSummary = await prisma.donation.findMany({
      where: {
        organizationId,
        personId: person.id,
      },
      include: {
        Person: true,
      },
    });

    return NextResponse.json({ donorSummary, person });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
