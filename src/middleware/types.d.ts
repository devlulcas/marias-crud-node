import { Role } from "../models/User";

declare module "fastify" {
  interface FastifyRequest {
    user: {
      id: number;
      username: string;
      role: Role;
    };
  }
}
