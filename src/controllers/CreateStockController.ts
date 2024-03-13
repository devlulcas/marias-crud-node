import { FastifyRequest, FastifyReply } from "fastify";
import { CreateStockService } from "../services/CreateStockService";

class CreateStockController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Extrai os dados da solicitação
      const { name, category, quantity } = request.body as {
        name: string;
        category: string;
        quantity: number;
      };

      // Verifica se todos os campos obrigatórios estão presentes
      if (!name || !category || quantity == null) {
        // Se algum campo estiver ausente, retorna um erro de requisição inválida
        reply.code(400).send({ message: "Todos os campos são obrigatórios." });
        return;
      }

      // Define o status como inativo se a quantidade for 0 ou menor
      const status = quantity <= 0 ? false : true;

      // Cria uma instância do serviço de criação
      const stockService = new CreateStockService();

      // Executa o serviço para criar um novo stock
      const stock = await stockService.execute({
        name,
        category,
        quantity,
        status, // Passa o status calculado para o serviço
      });

      // Envia a resposta de volta com os dados do cadastro recém-criado
      reply.code(201).send({ message: "Produto criado com sucesso", data: stock });
    } catch (error) {
      // Se ocorrer um erro durante o processamento da solicitação, retorna um erro interno do servidor
      console.error("Erro ao criar Produto:", error);
      reply.code(500).send({ message: "Erro interno do servidor." });
    }
  }
}

export { CreateStockController };
