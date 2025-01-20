import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ donationId: string }> }
) {
  try {
    const donationId = (await params).donationId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const donation = await prisma.donation.findUnique({
      where: {
        organizationId,
        id: donationId,
      },
      include: {
        Person: true,
      },
    });

    if (!donation) {
      throw new Error("Donation not found");
    }

    return NextResponse.json(donation);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
