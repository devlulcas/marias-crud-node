// Importa o objeto prismaClient que será utilizado para interagir com o banco de dados
import prismaClient from "../prisma";

// Classe responsável por executar a lógica para listar estoque
class ListCustomerService {
  // Método assíncrono que executa a listagem de estoque
  async execute() {
    // Consulta todos os estoque no banco de dados usando o Prisma
    const customers = await prismaClient.customer.findMany();

    // Retorna a lista de estoque
    return customers;
  }
}

// Exporta a classe do serviço de listagem de estoque para uso em outros arquivos
export { ListCustomerService };
