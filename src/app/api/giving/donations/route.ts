import { NextResponse } from "next/server";
import { z } from "zod";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";
import { donationSchema } from "@/lib/schemas/donation";

export async function GET() {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const donations = await prisma.donation.findMany({
      where: {
        organizationId,
      },
      include: {
        Person: true,
      },
    });

    if (!donations) throw new Error("Could not fetch donations");

    return NextResponse.json(donations);
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
    const donationData = donationSchema.parse(await req.json());

    const donation = await prisma.donation.create({
      data: {
        ...donationData,
        organizationId,
        loggedBy: session.user.name!,
      },
    });

    return NextResponse.json(donation);
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
