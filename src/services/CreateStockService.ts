import prismaClient from "../prisma";

interface ICreateStockProps {
  name: string;
  category: string;
  quantity: number;
  barcode: string;
  description: string;
  status: boolean; // Adiciona a propriedade status
}

class CreateStockService {
  async execute({
    name,
    category,
    quantity,
    barcode,
    description,
    status,
  }: ICreateStockProps) {
    if (!name || !category || isNaN(quantity) || !barcode || !description) {
      throw new Error("Preencha todos os campos corretamente");
    }

    // Cria o estoque no banco de dados usando o Prisma
    const stock = await prismaClient.stock.create({
      data: {
        name,
        category,
        quantity,
        barcode,
        description,
        status: status, // Define o status
      },
    });

    return stock;
  }
}

export { CreateStockService };
