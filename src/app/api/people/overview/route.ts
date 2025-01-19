import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth0.getSession();
    const organizationId = session?.user.org_id;

    const ageCounts = await prisma.person.groupBy({
      by: ["ageRange", "gender"],
      where: {
        organizationId,
      },
      _count: {
        _all: true,
      },
    });

    const joinYearCounts = await prisma.person.groupBy({
      by: ["joinDate"],
      where: {
        organizationId,
        joinDate: {
          not: null,
        },
      },
      _count: {
        _all: true,
      },
    });

    const joinYearSummary = joinYearCounts
      .filter((item) => item.joinDate)
      .map((item) => ({
        year: new Date(item.joinDate!).getFullYear(),
        count: item._count._all,
      }));

    let adultCount = 0;
    let childCount = 0;
    let maleCount = 0;
    let femaleCount = 0;
    let nonbinaryCount = 0;

    ageCounts.forEach((group) => {
      if (group.ageRange === "ADULT") adultCount += group._count._all;
      if (group.ageRange === "CHILD") childCount += group._count._all;
      if (group.gender === "MALE") maleCount += group._count._all;
      if (group.gender === "FEMALE") femaleCount += group._count._all;
      if (group.gender === "NONBINARY") nonbinaryCount += group._count._all;
    });

    return NextResponse.json({
      adultCount,
      childCount,
      maleCount,
      femaleCount,
      nonbinaryCount,
      joinYearSummary,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
