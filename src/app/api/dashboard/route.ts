import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const session = await auth0.getSession();
    const organizationId = session?.user.org_id;
    const personCount = await prisma.person.count({
      where: {
        organizationId,
      },
    });
    const groupCount = await prisma.group.count({
      where: {
        organizationId,
      },
    });
    const newestMembers = await prisma.person.findMany({
      where: {
        organizationId,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ personCount, groupCount, newestMembers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
