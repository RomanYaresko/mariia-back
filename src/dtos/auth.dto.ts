import { z } from "zod";

export const LoginRequestSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  token: z.string().nonempty(),
});

export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;
