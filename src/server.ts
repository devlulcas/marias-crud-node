// Importa o middleware de CORS do Fastify para lidar com as políticas de CORS
import cors from "@fastify/cors";
import Fastify, { FastifyInstance } from "fastify";
import { routes } from "./routes";
import replyPlugin from "./plugins/passPlugin";

const baseURL = "http://localhost:3333";
const port = process.env.PORT || 3333;

const app: FastifyInstance = Fastify({ logger: true });

// Configura um manipulador de erros para responder com status 400 e mensagem de erro em caso de exceção
app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

// Função assíncrona para iniciar o servidor
const start = async () => {
  try {
    // Registra o middleware de CORS para lidar com as políticas de CORS
    await app.register(cors);

    app.register(replyPlugin);

    // Registra as rotas da aplicação
    await app.register(routes, { prefix: "/api" }); // Prefixa todas as rotas com '/api'

    // Inicia o servidor na porta 3333
    await app.listen(port);
    console.log(`Server running at ${baseURL}`);
  } catch (err) {
    // Em caso de erro ao iniciar o servidor, encerra o processo
    console.error(err);
    process.exit(1);
  }
};

// Inicia o servidor chamando a função start
start();
