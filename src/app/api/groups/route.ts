import { NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import prisma from "../../../lib/prisma";

export const GET = withApiAuthRequired(async function (req) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const groups = await prisma.group.findMany({
      where: {
        organizationId,
      },
      include: {
        contacts: true,
      },
    });

    return NextResponse.json(groups);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
