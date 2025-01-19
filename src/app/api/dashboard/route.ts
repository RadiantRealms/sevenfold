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

    const [personCount, groupCount, newestMembers] = await Promise.all([
      prisma.person.count({
        where: {
          organizationId,
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

    return NextResponse.json({ personCount, groupCount, newestMembers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
