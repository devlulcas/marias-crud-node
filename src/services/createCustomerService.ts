import prismaClient from "../prisma";

// Definindo o tipo ICreateCustomerProps com status
interface ICreateCustomerProps {
  name: string;
  category: string;
  quantity: number;
  status: boolean; // Adiciona a propriedade status
}

class CreateCustomerService {
  async execute({ name, category, quantity }: ICreateCustomerProps) {
    // Verifica se todos os campos obrigatórios estão presentes e se quantity é um número válido
    if (!name || !category || isNaN(quantity)) {
      throw new Error("Preencha todos os campos corretamente");
    }

    // Cria o cliente no banco de dados usando o Prisma
    const customer = await prismaClient.customer.create({
      data: {
        name,
        category,
        quantity,
        status: quantity > 0, // Define o status com base na quantidade
      },
    });

    // Retorna o cliente recém-criado
    return customer;
  }
}

export { CreateCustomerService };
