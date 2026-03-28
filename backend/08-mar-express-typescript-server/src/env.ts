import { z } from "zod";

export const envSchema = z.object({
  PORT: z.string().optional(),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParsedEnv = envSchema.safeParse(env);

  if (!safeParsedEnv.success) throw new Error(safeParsedEnv.error.message);

  return safeParsedEnv.data;
}

export const env = createEnv(process.env);