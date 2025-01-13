import { NextResponse } from "next/server";
import { z } from "zod";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { householdSchema } from "@/lib/schemas/household";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ householdId: string }> }
) {
  try {
    const householdId = (await params).householdId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const household = await prisma.household.findUnique({
      where: {
        organizationId,
        id: householdId,
      },
      include: {
        primaryContact: true,
        people: true,
      },
    });

    if (!household) {
      throw new Error("Household not found");
    }

    return NextResponse.json(household);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ householdId: string }> }
) {
  try {
    const householdId = (await params).householdId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id!;
    const householdData = householdSchema.parse(await request.json());

    const { primaryContactId, ...rest } = householdData;

    if (primaryContactId) {
      const personExists = await prisma.person.findUnique({
        where: { id: primaryContactId },
      });

      if (!personExists) {
        throw new Error("The primary contact does not exist");
      }

      const isInHousehold = await prisma.household.findFirst({
        where: {
          id: householdId,
          people: {
            some: {
              id: primaryContactId,
            },
          },
        },
      });

      if (!isInHousehold) {
        await prisma.household.update({
          where: { id: householdId },
          data: {
            people: {
              connect: { id: primaryContactId },
            },
          },
        });
      }
    }

    const updatedHousehold = await prisma.household.update({
      where: {
        organizationId,
        id: householdId,
      },
      data: {
        ...rest,
        primaryContact: { connect: { id: primaryContactId } },
      },
    });

    return NextResponse.json(updatedHousehold);
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ householdId: string }> }
) {
  try {
    const householdId = (await params).householdId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const household = await prisma.household.delete({
      where: {
        organizationId,
        id: householdId,
      },
    });

    if (!household) {
      return NextResponse.json(
        { error: "Household could not be deleted" },
        { status: 400 }
      );
    }

    return NextResponse.json(household);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
