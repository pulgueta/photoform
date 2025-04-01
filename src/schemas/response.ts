import type { Form } from "@prisma/client";
import type { TypeOf } from "zod";
import { object, string } from "zod";

export const formResponseSchema = object({
  question: string(),
  answer: string(),
});

type FormResponse = TypeOf<typeof formResponseSchema>;

export interface ParsedForm extends Form {
  responses: FormResponse[];
}
