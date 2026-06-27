import { z } from "zod";

export const MariiaStepSchema = z.object({
  id: z.number(),
  isHead: z.boolean(),
  title: z.string().nullable(),
  isGift: z.boolean(),
  foundGiftButtonText: z.string().nullable(),
  giftName: z.string().nullable(),
  description: z.string().nullable(),
  buttonText: z.string(),
  nextId: z.number().nullable(),
  prevId: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type MariiaStepDto = z.infer<typeof MariiaStepSchema>;
