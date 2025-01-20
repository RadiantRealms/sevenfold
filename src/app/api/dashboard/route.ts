import dayjs from "dayjs";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const session = await auth0.getSession();
    const organizationId = session?.user.org_id;

    if (!organizationId) {
      throw new Error("Organization ID not found.");
    }

    const thirtyDaysAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");

    const [personCount, last30DaysDonations, groupCount, newestMembers] =
      await Promise.all([
        prisma.person.count({
          where: {
            organizationId,
          },
        }),
        prisma.donation.aggregate({
          where: {
            organizationId,
            date: {
              gte: thirtyDaysAgo,
            },
          },
          _sum: {
            amount: true,
          },
        }),
        prisma.group.count({
          where: {
            organizationId,
          },
        }),
        prisma.person.findMany({
          where: {
            organizationId,
          },
          take: 5,
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

    const last30DaysDonationAmount = last30DaysDonations._sum.amount;

    return NextResponse.json({
      personCount,
      last30DaysDonationAmount,
      groupCount,
      newestMembers,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
