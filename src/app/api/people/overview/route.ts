import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth0.getSession();
    const organizationId = session?.user.org_id;
    const adultCount = await prisma.person.count({
      where: {
        organizationId,
        ageRange: "ADULT",
      },
    });
    const childCount = await prisma.person.count({
      where: {
        organizationId,
        ageRange: "CHILD",
      },
    });

    return NextResponse.json({ adultCount, childCount });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
