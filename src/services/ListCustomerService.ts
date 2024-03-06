// Importa o objeto prismaClient que será utilizado para interagir com o banco de dados
import prismaClient from "../prisma";

// Classe responsável por executar a lógica para listar clientes
class ListCustomerService {
  // Método assíncrono que executa a listagem de clientes
  async execute() {
    // Consulta todos os clientes no banco de dados usando o Prisma
    const customers = await prismaClient.customer.findMany();

    // Retorna a lista de clientes
    return customers;
  }
}

// Exporta a classe do serviço de listagem de clientes para uso em outros arquivos
export { ListCustomerService };
