import { NextResponse } from "next/server";

import { auth0 } from "@/lib/auth0";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const session = await auth0.getSession();

    if (!session) throw new Error("User is unauthorized");

    const organizationId = session?.user.org_id;
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    if (!query) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const people = await prisma.person.findMany({
      where: {
        organizationId,
        OR: [
          { fullName: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
          { phone: { contains: query, mode: "insensitive" } },
          { streetAddress: { contains: query, mode: "insensitive" } },
          { city: { contains: query, mode: "insensitive" } },
          { state: { contains: query, mode: "insensitive" } },
          { postalCode: { contains: query, mode: "insensitive" } },
          { gender: { contains: query, mode: "insensitive" } },
          { ageRange: { contains: query, mode: "insensitive" } },
          { maritalStatus: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        Household: true,
        lists: true,
        groups: true,
        donations: true,
      },
    });

    return new Response(JSON.stringify(people), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status || 500 }
    );
  }
}
