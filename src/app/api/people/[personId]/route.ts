import { NextResponse } from "next/server";
import { z } from "zod";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { personSchema } from "@/lib/schemas/person";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ personId: string }> }
) {
  try {
    const personId = (await params).personId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const person = await prisma.person.findUnique({
      where: {
        organizationId,
        id: personId,
      },
    });

    if (!person) {
      throw new Error("Person not found");
    }

    return NextResponse.json(person);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ personId: string }> }
) {
  try {
    const personId = (await params).personId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id!;
    const personData = personSchema.parse(await request.json());

    const person = await prisma.person.update({
      where: {
        organizationId,
        id: personId,
      },
      data: personData,
    });

    return NextResponse.json(person);
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
  { params }: { params: Promise<{ personId: string }> }
) {
  try {
    const personId = (await params).personId;
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const person = await prisma.person.delete({
      where: {
        organizationId,
        id: personId,
      },
    });

    if (!person) {
      return NextResponse.json(
        { error: "Person could not be deleted" },
        { status: 400 }
      );
    }

    return NextResponse.json(person);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
