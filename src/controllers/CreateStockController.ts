import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CreateStockController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, category, quantity, barcode, description, imageUrl } =
        request.body as {
          name: string;
          category: string;
          quantity: number;
          barcode: string;
          description: string;
          imageUrl: string;
        };

      if (!name || !category || quantity == null) {
        return reply
          .code(400)
          .send({ message: "Todos os campos são obrigatórios." });
      }

      // Verificar se todos os campos obrigatórios foram fornecidos

      const status = quantity > 0;

      // Criar o produto com os dados fornecidos
      const stock = await prisma.stock.create({
        data: {
          name,
          category,
          quantity,
          barcode,
          description,
          status,
          imageUrl,
        },
      });

      const responseData = {
        id: stock.id,
        name: stock.name,
        category: stock.category,
        quantity: stock.quantity,
        status: stock.status,
      };

      reply.code(201).send({
        message: "Produto criado com sucesso",
        data: responseData,
      });
    } catch (error) {
      console.error("Erro ao criar Produto:", error);
      reply.code(500).send({ message: "Erro interno do servidor.", error });
    }
  }
}

export { CreateStockController };
