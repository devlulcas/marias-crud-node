import { FastifyRequest, FastifyReply } from "fastify";
import { findUserByUsername } from "../services/findUserByUsername";
import bcrypt from "bcrypt";

export class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { username, password } = request.body as {
      username: string;
      password: string;
    };

    try {
      const user = await findUserByUsername(username);

      if (!user) {
        reply
          .status(401)
          .send({ success: false, message: "Usuário não encontrado" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        reply.status(401).send({ success: false, message: "Senha incorreta" });
        return;
      }

      reply.send({ success: true, user });
    } catch (error: any) {
      reply.status(500).send({ success: false, error: error.message });
    }
  }
}
