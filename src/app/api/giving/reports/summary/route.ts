import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;

    const donorSummary = await prisma.donation.groupBy({
      by: ["personId"],
      where: {
        organizationId,
      },
      _count: {
        id: true,
      },
      _sum: {
        amount: true,
      },
    });

    const donorReport = await Promise.all(
      donorSummary.map(async (summary) => {
        const person = await prisma.person.findUnique({
          where: { id: summary.personId! },
          select: { fullName: true, phone: true, email: true, Household: true },
        });

        return {
          personId: summary.personId,
          fullName: person?.fullName || "N/A",
          household: person?.Household,
          totalDonations: summary._count.id,
          totalAmount: summary._sum.amount,
        };
      })
    );

    return NextResponse.json({ donorReport });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
