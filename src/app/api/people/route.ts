import { NextResponse } from "next/server";
import { z } from "zod";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { personSchema } from "@/lib/schemas/person";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const people = await prisma.person.findMany({
      where: {
        organizationId,
      },
      include: {
        primaryFor: true,
      },
    });

    if (!people) throw new Error("Could not fetch people");

    return NextResponse.json(people);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id!;
    const personData = personSchema.parse(await request.json());

    const person = await prisma.person.create({
      data: {
        ...personData,
        organizationId,
      },
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
