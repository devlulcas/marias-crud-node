
// Importa as definições de tipos FastifyRequest e FastifyReply do módulo "fastify"
import { FastifyRequest, FastifyReply } from "fastify";

// Importa a classe ListCustomerService do arquivo de serviço correspondente
import { ListCustomerService } from "../services/ListCustomerService";

// Classe responsável por lidar com as requisições para listar clientes
class ListCustomerController {
  // Método assíncrono que lida com a requisição de listagem de clientes
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Instancia o serviço de listagem de clientes
    const listCustomerService = new ListCustomerService();

    // Executa o serviço de listagem de clientes e aguarda o resultado
    const customer = await listCustomerService.execute();

    // Envia a resposta ao cliente com a lista de clientes
    reply.send(customer);
  }
}

// Exporta a classe do controlador de listagem de clientes para uso em outros arquivos
export { ListCustomerController };
