
// Importa as definições de tipos FastifyRequest e FastifyReply do módulo "fastify"
import { FastifyRequest, FastifyReply } from "fastify";

// Importa a classe ListCustomerService do arquivo de serviço correspondente
import { ListCustomerService } from "../services/ListCustomerService";

// Classe responsável por lidar com as requisições para listar estoque
class ListCustomerController {
  // Método assíncrono que lida com a requisição de listagem de estoque
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Instancia o serviço de listagem de estoque
    const listCustomerService = new ListCustomerService();

    // Executa o serviço de listagem de estoque e aguarda o resultado
    const customer = await listCustomerService.execute();

    // Envia a resposta ao cliente com a lista de estoque
    reply.send(customer);
  }
}

// Exporta a classe do controlador de listagem de estoque para uso em outros arquivos
export { ListCustomerController };
