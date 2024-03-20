import { PrismaClient } from "@prisma/client";

interface CurrentStockReport {
  name: string;
  category: string | null;
  quantity: number | null;
}
class CurrentStockReportService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async generateReport(): Promise<CurrentStockReport[]> {
    const currentStock = await this.prisma.stock.findMany({
      select: {
        name: true,
        category: true,
        quantity: true,
      },
    });

    return currentStock.map((stockItem) => ({
      name: stockItem.name,
      category: stockItem.category,
      quantity: stockItem.quantity,
    }));
  }
}

export { CurrentStockReportService, CurrentStockReport };
