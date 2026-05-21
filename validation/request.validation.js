import { z } from "zod";

export const singupPostRequestBodySchema = z.object({
  firstname: z.string().min(3),
  lastname: z.string().min(3).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});
