import { z } from "zod";

export const SuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });

export type SuccessResponse<T> = z.infer<
  ReturnType<typeof SuccessResponseSchema<z.ZodTypeAny>>
> & {
  data: T;
};

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.array(z.object({ message: z.string() })).optional(),
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
