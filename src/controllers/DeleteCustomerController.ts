// Importa as definições de tipos FastifyRequest e FastifyReply do módulo "fastify"
import { FastifyRequest, FastifyReply } from "fastify";

// Importa a classe DeleteCustomerService do arquivo de serviço correspondente
import { DeleteCustomerService } from "../services/DeleteCustomerService";

// Classe responsável por lidar com as requisições para excluir um cliente
class DeleteCustomerController {
  // Método assíncrono que lida com a requisição de exclusão de cliente
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Extrai o ID do cliente a ser excluído dos parâmetros da requisição
    const { id } = request.query as { id: string };

    // Instancia o serviço de exclusão de cliente
    const customerService = new DeleteCustomerService();

    // Executa o serviço de exclusão de cliente com o ID fornecido e aguarda o resultado
    const customer = await customerService.execute({ id });

    // Envia a resposta ao cliente com o resultado da exclusão
    reply.send(customer);
  }
}

// Exporta a classe do controlador de exclusão de cliente para uso em outros arquivos
export { DeleteCustomerController };
