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

    if (!groups) throw new Error("Could not fetch groups");

    return NextResponse.json(groups);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const POST = withApiAuthRequired(async function (req: Request) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const { name } = await req.json();
    const groupExists = await prisma.group.findFirst({
      where: { organizationId, name },
    });

    if (groupExists) {
      return NextResponse.json(
        { error: "Group with that name already exists" },
        { status: 409 }
      );
    }

    const group = await prisma.group.create({
      data: {
        organizationId,
        name,
      },
    });

    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: error.status || 500 }
    );
  }
});
