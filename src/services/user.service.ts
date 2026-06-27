import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const userService = {
  async create(username: string, password: string): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    });
  },

  async find(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
    });
  },
};
