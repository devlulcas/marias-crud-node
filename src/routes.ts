// Importações necessárias do Fastify para tipos e funcionalidades
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

// Importações dos controladores para manipular as requisições
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { ListCustomerController } from "./controllers/ListCustomerController";
import { CreateCustomerController } from "./controllers/createCustomerController";

// Função responsável por definir as rotas da aplicação
export async function routes(
  fastify: FastifyInstance,
) {
  // Rota de teste simples para verificar se o servidor está online
  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true }; // Retorna um objeto indicando que o servidor está online
    }
  );

  // Rota para registrar um novo produto
  fastify.post(
    "/register",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de criação de produto e chama o método handle para lidar com a requisição
      return new CreateCustomerController().handle(request, reply);
    }
  );

  // Rota para listar produtos
  fastify.get("/list", async (request: FastifyRequest, reply: FastifyReply) => {
    // Cria uma instância do controlador de listagem de produtos e chama o método handle para lidar com a requisição
    return new ListCustomerController().handle(request, reply);
  });

  // Rota para excluir um produto
  fastify.delete(
    "/delete",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de exclusão de produto e chama o método handle para lidar com a requisição
      return new DeleteCustomerController().handle(request, reply);
    }
  );
}
