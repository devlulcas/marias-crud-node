import { FastifyRequest, FastifyReply } from "fastify";
import { findUserByUsername } from "../services/findUserByUsername";

export class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };
    try {
      const user = await findUserByUsername(username);
      if (!user || user.password !== password) {
        reply
          .status(401)
          .send({ success: false, message: "Nome ou senha invalidos!" });
        return;
      }
      reply.send({ success: true, user });
    } catch (error: any) {
      reply.status(500).send({ success: false, error: error.message });
    }
  }
}
