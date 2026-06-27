import { z } from "zod";
import { USER_MESSAGES } from "@/constants/messages/user.messages";

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  createdAt: z.coerce.date(),
});

export type UserDto = z.infer<typeof UserSchema>;

export const RegisterUserSchema = z.object({
  username: z
    .string()
    .min(3, USER_MESSAGES.USERNAME_MIN_LENGTH_VALIDATION)
    .max(30, USER_MESSAGES.USERNAME_MAX_LENGTH_VALIDATION),
  password: z.string().min(6, USER_MESSAGES.PASSWORD_MIN_LENGTH_VALIDATION),
});

export type RegisterUserDto = z.infer<typeof RegisterUserSchema>;
