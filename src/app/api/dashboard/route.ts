import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";

export const GET = withApiAuthRequired(async function (req) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const contactCount = await prisma.contact.count({
      where: {
        organizationId,
      },
    });
    const groupCount = await prisma.group.count({
      where: {
        organizationId,
      },
    });

    return NextResponse.json({ contactCount, groupCount });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
