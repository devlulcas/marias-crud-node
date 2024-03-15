import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../services/UserService"; 
import { Role } from "../models/User";

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { username, password, role } = request.body as {
      username: string;
      password: string;
      role: Role; 
    };
    try {
      const user = await createUser(username, password, role);
      reply.send({ success: true, user });
    } catch (error: any) {
      reply.status(500).send({ success: false, error: error.message });
    }
  }
}
