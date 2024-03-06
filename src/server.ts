// Importa o middleware de CORS do Fastify para lidar com as políticas de CORS
import cors from "@fastify/cors";

// Importa o módulo Fastify para criar o servidor web e registrar rotas
import Fastify from "fastify";

// Importa as definições de rotas da aplicação
import { routes } from "./routes";

// Cria uma instância do aplicativo Fastify, habilitando o registro de logs
const app = Fastify({ logger: true });

// Configura um manipulador de erros para responder com status 400 e mensagem de erro em caso de exceção
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Função assíncrona para iniciar o servidor
const start = async () => {
  // Registra o middleware de CORS para lidar com as políticas de CORS
  await app.register(cors);

  // Registra as rotas da aplicação
  await app.register(routes);

  try {
    // Inicia o servidor na porta 3333
    await app.listen({ port: 3333 });
  } catch (err) {
    // Em caso de erro ao iniciar o servidor, encerra o processo
    process.exit(1);
  }
};

// Inicia o servidor chamando a função start
start();
