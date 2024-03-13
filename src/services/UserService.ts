import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export interface User {
  id: string;
  username: string;
  password: string;
}

export async function createUser(
  username: string,
  password: string
): Promise<User> {
  // Criptografar a senha antes de armazená-la no banco de dados
  const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo do hash (quanto maior, mais seguro, mas mais lento)

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword, // Armazenar o hash da senha no banco de dados
    },
  });
  return {
    id: user.id,
    username: user.username,
    password: user.password,
  };
}
