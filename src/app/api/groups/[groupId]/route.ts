import { NextResponse } from "next/server";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "@/lib/prisma";

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

    if (!group) throw new Error("Could not fetch group with that ID");

    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const PUT = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const { name } = await req.json();
    const group = await prisma.group.update({
      where: {
        organizationId,
        id: params?.groupId as string,
      },
      data: {
        name,
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Group could not be updated" },
        { status: 400 }
      );
    }

    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});

export const DELETE = withApiAuthRequired(async function (req, { params }) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const group = await prisma.group.delete({
      where: {
        organizationId,
        id: params?.groupId as string,
      },
    });

    if (!group) {
      return NextResponse.json(
        { error: "Group could not be deleted" },
        { status: 400 }
      );
    }

    return NextResponse.json(group);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
});
