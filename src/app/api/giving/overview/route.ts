import { NextResponse } from "next/server";
import dayjs from "dayjs";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;

    const thirtyDaysAgo = dayjs().subtract(30, "day").format("YYYY-MM-DD");

    const last30DaysDonations = await prisma.donation.aggregate({
      where: {
        organizationId,
        date: {
          gte: thirtyDaysAgo,
        },
      },
      _sum: {
        amount: true,
      },
    });

    const totalDonations = await prisma.donation.aggregate({
      where: {
        organizationId,
      },
      _sum: {
        amount: true,
      },
    });

    const donorCount = await prisma.person.count({
      where: {
        organizationId,
        donations: {
          some: {},
        },
      },
    });

    const latestDonations = await prisma.donation.findMany({
      where: {
        organizationId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Person: true,
      },
    });

    const last30DaysDonationAmount = last30DaysDonations._sum.amount;

    const totalDonationsAmount = totalDonations._sum.amount;

    return NextResponse.json({
      last30DaysDonationAmount,
      totalDonationsAmount,
      donorCount,
      latestDonations,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
