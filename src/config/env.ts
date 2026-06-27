import { GENERAL_MESSAGES } from "@/constants/messages/general.messages";
import "dotenv/config";
import { z } from "zod";

const EnvSchema = z.object({
  SECRET_KEY: z.string().min(1, GENERAL_MESSAGES.SECRET_KEY_VALIDATION),
  DATABASE_URL: z.string().min(1, GENERAL_MESSAGES.DATABASE_URL_VALIDATION),
  JWT_EXPIRE_TIME: z
    .string()
    .min(1, GENERAL_MESSAGES.JWT_EXPIRE_TIME_VALIDATION),
  PORT: z.coerce
    .number()
    .int(GENERAL_MESSAGES.PORT_TYPE_VALIDATION)
    .min(1, GENERAL_MESSAGES.PORT_RANGE_VALIDATION)
    .max(65535, GENERAL_MESSAGES.PORT_RANGE_VALIDATION),
  JWT_ALGORITHM: z.string().min(1, GENERAL_MESSAGES.JWT_ALGORITHM_VALIDATION),
  CORS_ALLOWED_ORIGINS: z
    .string()
    .min(1, GENERAL_MESSAGES.CORS_ALLOWED_ORIGINS_VALIDATION),
  SMTP_HOST: z.string().min(1, GENERAL_MESSAGES.SMTP_HOST_VALIDATION),
  SMTP_USER: z.string().min(1, GENERAL_MESSAGES.SMTP_USER_VALIDATION),
  SMTP_PASS: z.string().min(1, GENERAL_MESSAGES.SMTP_PASS_VALIDATION),
});

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");

  throw new Error(`${GENERAL_MESSAGES.INVALID_ENV} ${issues}`);
}

export const env = parsedEnv.data;
