import { object, string } from "zod";

export const userIdSchema = object({
  userId: string().optional(),
});
