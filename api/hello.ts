import type {
  FastifyInstance,
  // FastifyPluginCallback,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

// import { NextServer } from "next/dist/server/next";

const HelloApi = (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  done: () => void
) => {
  // using next
  /*  instance.next(
    `${instance.prefix}/hello`,
    { method: "GET" },
    async (app: NextServer, req: FastifyRequest, reply: FastifyReply) => {
      reply.send({ name: "Steve Jobs" });
    }
  ); */

  instance.get("/hello", async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ name: "Steve Jobs" });
  });

  instance.get("/bar", async (req: FastifyRequest, reply: FastifyReply) => {
    reply.send({ name: "Massimo Bottura" });
  });

  done();
};

export default HelloApi;
