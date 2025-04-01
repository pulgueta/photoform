import type { User } from "@prisma/client";
import { createServerFn } from "@tanstack/react-start";
import { generateSlug } from "random-word-slugs";

import { app_url } from "@/constants/keys";
import { authMiddleware } from "@/middlewares/auth";
import type { ParsedForm } from "@/schemas/response";
import { formResponseSchema } from "@/schemas/response";
import { prisma } from "@/utils/prisma";

async function createForm(data: ParsedForm) {
  const formUUID = crypto.randomUUID();
  const shareUrl = `${app_url}/form/${formUUID}`;

  const responses = formResponseSchema.safeParse(data.responses);

  if (!responses.success) {
    throw new Error("Invalid responses");
  }

  const form = await prisma.form.create({
    data: {
      name: generateSlug(),
      uuid: formUUID,
      shareUrl,
      responses,
      User: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  return form.uuid;
}

export const createFormFn = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((data: ParsedForm) => data)
  .handler(async ({ data }) => {
    const form = await createForm(data);

    return form;
  });

async function getPhotographerForms(photographerId: User["id"]) {
  const forms = await prisma.form.findMany({
    where: {
      userId: photographerId,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });

  return forms.map((form) => ({
    ...form,
    responses: formResponseSchema.parse(form.responses),
  }));
}

export const getPhotographerFormsFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context: { user } }) => {
    const forms = await getPhotographerForms(user.id);

    return forms;
  });
