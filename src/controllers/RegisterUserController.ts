import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "../services/UserService";

export class RegisterUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };
    try {
      const user = await createUser(username, password);
      reply.send({ success: true, user });
    } catch (error: any) {
      reply.status(500).send({ success: false, error: error.message });
    }
  }
}
