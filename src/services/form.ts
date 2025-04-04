import type { User } from "@prisma/client";
import { createServerFn } from "@tanstack/react-start";
import { generateSlug } from "random-word-slugs";

import { app_url } from "@/constants/keys";
import type { BuilderFormField } from "@/context/form-builder-context";
import type { Form } from "@/generated";
import { authMiddleware } from "@/middlewares/auth";
import { prisma } from "@/utils/prisma";

type ParsedFormField = Pick<BuilderFormField, "label" | "required"> & {
  type: string;
};

interface ParsedForm extends Form {
  fields: ParsedFormField[];
}

export async function createForm(data: ParsedForm) {
  const formUUID = crypto.randomUUID();
  const shareUrl = `${app_url}/form/${formUUID}`;

  const form = await prisma.form.create({
    data: {
      name: generateSlug(),
      uuid: formUUID,
      shareUrl,

      isDraft: data.isDraft ?? true,
      isPublished: !data.isDraft,
      fields: {
        create: data.fields?.map((field) => ({
          label: field.label,
          fieldType: field.type,
          required: field.required,
        })),
      },
      User: {
        connect: {
          id: data.userId,
        },
      },
    },
  });

  return form.uuid;
}

export async function updateForm(formId: string, data: Partial<ParsedForm>) {
  const form = await prisma.form.update({
    where: {
      id: formId,
    },
    data: {
      isDraft: data.isDraft,
      isPublished: !data.isDraft,
      fields: {
        create: data.fields?.map((field) => ({
          label: field.label,
          fieldType: field.type,
          required: field.required,
        })),
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
    include: {
      FormResponses: true,
    },
    cacheStrategy: {
      ttl: 60,
    },
  });

  return forms;
}

export const getPhotographerFormsFn = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context: { user } }) => {
    const forms = await getPhotographerForms(user.id);

    return forms;
  });
