import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../../../../lib/prisma";

export const GET = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const group = await prisma.group.findUnique({
      where: {
        organizationId,
        id: params?.groupId as string,
      },
      include: {
        contacts: true,
      },
    });

    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
