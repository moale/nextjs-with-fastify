#!/usr/bin/env ts-node

import Fastify from "fastify";

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { isProd } from "./utils/env";

import type { FastifyInstance, FastifyRequest } from "fastify";

interface Config {
  port: number;
  hostname: string;
  // these will have passed to app.module, maybe we can avoid to pass option here?
  appConfig?: Record<string, any>;
}

async function buidServer({
  port,
  hostname,
  appConfig,
}: Config): Promise<FastifyInstance> {
  const fastify = Fastify({
    logger: {
      prettyPrint: false,
    },
  });

  // NOTE: to make nextjs middleware works we have to pass port and hostmname
  await fastify.register(import("fastify-nextjs"), {
    dev: !isProd,
    hostname,
    port,
  });

  fastify.after(async (err: Error) => {
    if (err) throw err;
    await fastify.register(import("./App.module"), {
      prefix: "",
      ...appConfig,
    });
  });

  return fastify;
}

const argv = yargs(hideBin(process.argv)).argv;
// TODO: better type
const HOSTNAME: string = (argv as any).hostname ?? "localhost";
const PORT: number = (argv as any).port ?? 3000;

buidServer({
  port: PORT,
  hostname: HOSTNAME,
}).then(async (fastify) => {
  await fastify.listen({ port: PORT, host: HOSTNAME }).catch((e) => {
    console.error(e);
    process.exit(1);
  });

  console.log(`Server listening on http://${HOSTNAME}:${PORT}`);
});
