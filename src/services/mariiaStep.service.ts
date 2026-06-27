import { MariiaStep, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const mariiaStepSelect = {
  id: true,
  isHead: true,
  title: true,
  isGift: true,
  foundGiftButtonText: true,
  giftName: true,
  description: true,
  buttonText: true,
  nextId: true,
  prevId: true,
  createdAt: true,
  updatedAt: true,
} as const;

export const mariiaStepService = {
  async findHead(): Promise<MariiaStep | null> {
    return prisma.mariiaStep.findFirst({
      where: { isHead: true },
      select: mariiaStepSelect,
    });
  },

  async findById(id: number): Promise<MariiaStep | null> {
    return prisma.mariiaStep.findUnique({
      where: { id },
      select: mariiaStepSelect,
    });
  },
};
