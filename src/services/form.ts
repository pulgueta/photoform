import type { Form, User } from "@prisma/client";

import { prisma } from "@/utils/prisma";

export async function createForm(data: Form) {
  const form = await prisma.form.create({
    data: {
      name: data.name,
      slug: data.slug,
      User: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  return form;
}

export async function getPhotographerForms(photographerId: User["id"]) {
  const forms = await prisma.form.findMany({
    where: {
      userId: photographerId,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });

  return forms;
}
