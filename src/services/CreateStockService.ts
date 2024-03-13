import prismaClient from "../prisma";

// Definindo o tipo ICreateStockProps com status
interface ICreateStockProps {
  name: string;
  category: string;
  quantity: number;
  status: boolean; // Adiciona a propriedade status
}

class CreateStockService {
  async execute({ name, category, quantity }: ICreateStockProps) {
    // Verifica se todos os campos obrigatórios estão presentes e se quantity é um número válido
    if (!name || !category || isNaN(quantity)) {
      throw new Error("Preencha todos os campos corretamente");
    }

    // Cria o estoque no banco de dados usando o Prisma
    const stock = await prismaClient.stock.create({
      data: {
        name,
        category,
        quantity,
        status: quantity > 0, // Define o status com base na quantidade
      },
    });

    // Retorna o estoque recém-criado
    return stock;
  }
}

export { CreateStockService };
