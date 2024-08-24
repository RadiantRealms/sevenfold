import { NextResponse } from "next/server";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { createContactSchema } from "@/lib/schemas/contact";

export const GET = withApiAuthRequired(async function (req) {
  try {
    const session = await getSession();
    const organizationId = session?.user.org_id;
    const contacts = await prisma.contact.findMany({
      where: {
        organizationId,
      },
      include: {
        Group: { select: { id: true, name: true } },
      },
    });

    return NextResponse.json(contacts);
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
    const contactData = createContactSchema.parse(await req.json());

    const contact = await prisma.contact.create({
      data: {
        ...contactData,
        organizationId,
      },
    });

    return NextResponse.json(contact);
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
});
