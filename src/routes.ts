// Importações necessárias do Fastify para tipos e funcionalidades
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

// Importações dos controladores para manipular as requisições
import { DeleteStockController } from "./controllers/DeleteStockController";
import { CreateStockController } from "./controllers/CreateStockController";
import { LoginUserController } from "./controllers/LoginUserController";
import { RegisterUserController } from "./controllers/RegisterUserController";
import { logoutUser } from "./controllers/logoutController";
import { getUsers } from "./controllers/UsersListController";
import { deleteUserHandler } from "./controllers/DeleteUserController";
import { authorize } from "./middleware/authorization";
import {
  getProductCountHandler,
  getUserCountHandler,
} from "./controllers/countHandlers";
import { getProductCountByCategoryHandler } from "./controllers/getProductCountByCategoryHandler";
import { CurrentStockReportController } from "./controllers/relatorios/CurrentStockReportController";
import { ListStockController } from "./controllers/ListStockController";

// Função responsável por definir as rotas da aplicação
export async function routes(fastify: FastifyInstance) {
  // Rota de teste simples para verificar se o servidor está online
  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true }; // Retorna um objeto indicando que o servidor está online
    }
  );

  const currentStockReportController = new CurrentStockReportController();

  fastify.get("/current-stock-report", async (request, reply) => {
    // Chame o método `handle` do controlador e retorne sua resposta
    return currentStockReportController.handle(request, reply);
  });

  // Rota de login
  fastify.post(
    "/login",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply);
    }
  );

  // Rota para registrar um novo usuario
  fastify.post("/register", async (request, reply) => {
    return new RegisterUserController().handle(request, reply);
  });

  // Rota para listar usuários
  fastify.get("/users", getUsers);

  // Rota para deletar um usuário
  fastify.delete("/delete-users/:userId", deleteUserHandler);

  // Rota para o administrador
  fastify.get(
    "/admin",
    { preHandler: authorize("ADMIN") },
    async (request, reply) => {
      reply.send({
        message: "Esta rota é acessível apenas para administradores",
      });
    }
  );

  // Rota para o usuário comum
  fastify.get(
    "/user",
    { preHandler: authorize("USER") },
    async (request, reply) => {
      return { message: "Esta é uma rota privada do usuário" };
    }
  );

  // Rota para logout
  fastify.post(
    "/logout",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Chama a função do controlador de logout
      await logoutUser(request, reply);
    }
  );

  // Rota para registrar um novo produto
  fastify.post(
    "/register-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de criação de produto e chama o método handle para lidar com a requisição
      return new CreateStockController().handle(request, reply);
    }
  );

  // Rota para listar produtos
  fastify.get(
    "/list-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de listagem de produtos e chama o método handle para lidar com a requisição
      return new ListStockController().handle(request, reply);
    }
  );

  fastify.get("/products/count", getProductCountHandler);
  fastify.get("/users/count", getUserCountHandler);

  fastify.get("/products/count-by-category", getProductCountByCategoryHandler);

  // Rota para excluir um produto
  fastify.delete(
    "/delete-stock",
    async (request: FastifyRequest, reply: FastifyReply) => {
      // Cria uma instância do controlador de exclusão de produto e chama o método handle para lidar com a requisição
      return new DeleteStockController().handle(request, reply);
    }
  );
}
