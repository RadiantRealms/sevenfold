import { NextResponse } from "next/server";
import { z } from "zod";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { householdSchema } from "@/lib/schemas/household";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const households = await prisma.household.findMany({
      where: {
        organizationId,
      },
      include: {
        primaryContact: true,
        people: true,
      },
    });

    if (!households) throw new Error("Could not fetch households");

    return NextResponse.json(households);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id!;
    const householdData = householdSchema.parse(await req.json());

    const household = await prisma.household.create({
      data: {
        ...householdData,
        organizationId,
        people: {
          connect: {
            id: householdData.primaryContactId,
          },
        },
      },
    });

    return NextResponse.json(household);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }

    const statusCode = error?.status || 500;
    const message = error?.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status: statusCode });
  }
}
