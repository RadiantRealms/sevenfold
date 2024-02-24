"use server";

import prisma from "../../lib/prisma";

export default async function getContactById(id: string) {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });

    return contact;
  } catch (error) {
    console.error(error);
  }
}
