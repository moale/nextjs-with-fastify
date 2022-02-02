import fp from "fastify-plugin";
import { NotFoundError } from "restify-errors";

import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyRequest,
  // FastifyPluginCallback,
  // FastifyPluginAsync,
} from "fastify";

interface AppModuleConfig {
  showNotFoundPageInDev?: boolean;
  plugins?: [any, any?][]; //<T, O = Record<string, any>>() => [() => Promise<T> | T, O][];
}

// NOTE: i don't know why this signature const AppModule: FastifyPluginAsync<AppModuleConfig> doens't works
// maybe https://github.com/fastify/fastify/issues/2403

const AppModule /* : FastifyPluginAsync<AppModuleConfig> */ = async (
  instance: FastifyInstance,
  opts: FastifyPluginOptions,
  // NOTE: also here bhooooo!!!!
  done: () => void //FastifyPluginCallback
) => {
  // NOTE:
  const optionTrick = opts as AppModuleConfig; // in this way we lost the FastifyPluginOptions default if there are, i don't why FastifyPluginOptions is not a generic

  instance.setNotFoundHandler((request, reply) => {
    const error = new NotFoundError();

    if (request.url.startsWith("/api")) {
      reply.code(404).send(error.toJSON());
    } else {
      // NOTE: if we pass the error to nextRenderError the 404 page will be visible only in prod due to next error overlay
      // if we want to see 404 even in dev, we have to trick typescript by passing undefined
      reply
        .code(404)
        .nextRenderError(optionTrick.showNotFoundPageInDev ? void 0 : error);
    }
  });

  instance.setErrorHandler((err, req, reply) => {
    reply.status(err.statusCode || 500).nextRenderError(err);
  });

  await instance.register(
    import("fastify-cors"),
    (instance: FastifyInstance) => {
      return (req: FastifyRequest, callback) => {
        const origin: string = req.headers.origin!;
        console.log(76767767676, origin);

        //NOTE: callback expects two parameters: error and options
        callback(
          null,
          /localhost/.test(origin) ? { origin: true } : { origin: true }
        );
      };
    }
  );

  /* plugins?.forEach(
    async ([plugin, options]) => await fastify.register(plugin, options)
  ); */

  // TODO: figure out a way to make easier add new api and webpage routes without break open/close
  // for api maybe can load them from filesystem, i try fastify-autoroutes but it doesn't work :(
  instance.register(
    async (instance: FastifyInstance, opts, done) => {
      await instance.register(import("./api/hello"));

      done();
    },
    // NOTE: if you use next api the prefix will be ignored and you have to add /api to your route
    { prefix: "/api" }
  );

  // NOTE: the HEAD method need to make the Link component works
  // make sure that is add after the api registration otherwise even api respond to HEAD
  instance.next("*", { method: "HEAD" });

  // REF: https://github.com/fastify/fastify-nextjs/blob/5f18c705037187565c3f987521f357a5bbfb33c2/index.js#L50
  instance.next("/");
  instance.next("/foo");
  instance.next("/error", async (next, req, reply) => {
    throw new Error("boom");
  });

  done();
};

export default fp(AppModule, {
  fastify: ">=3.0.0",
  name: "fastify-app-module",
});
