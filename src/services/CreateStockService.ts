import { PrismaClient } from "@prisma/client";

interface CreateStockDTO {
  name: string;
  category: string;
  quantity: number;
  barcode: string;
  description: string;
  status: boolean;
  imageUrl: string;
}

class CreateStockService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(data: CreateStockDTO): Promise<any> {
    const { name, category, quantity, barcode, description, status, imageUrl } =
      data;

    try {
      const createdStock = await this.prisma.stock.create({
        data: {
          name,
          category,
          quantity,
          barcode,
          description,
          status,
          imageUrl,
        },
      });

      return createdStock;
    } catch (error) {
      throw new Error(`Erro ao criar produto: ${error}`);
    }
  }
}

export { CreateStockService };
