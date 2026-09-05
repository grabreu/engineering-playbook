import { z } from "zod";

const EnvSchema = z.object({
  API_URL: z.url(),
});

export const env = EnvSchema.parse(process.env);
