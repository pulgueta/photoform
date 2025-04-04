import type { BuilderFormField } from "@/context/form-builder-context";
import type { Form } from "@prisma/client";
import type { TypeOf } from "zod";
import { object, string } from "zod";

export const formResponseSchema = object({
  question: string(),
  answer: string(),
});

type FormResponse = TypeOf<typeof formResponseSchema>;

export interface BuilderField {
  id: string;
  label: string;
  type: string;
  required: boolean;
}

export interface ParsedForm extends Form {
  responses: FormResponse[];
  fields: BuilderFormField[];
}
