import { isBrowser } from "./helpers";

export const ENV = (() => process.env)();

export const isDev = isBrowser()
  ? process.env.NEXT_PUBLIC_NODE_ENV === "development"
  : ENV.NODE_ENV === "development";
export const isProd = isBrowser()
  ? process.env.NEXT_PUBLIC_NODE_ENV === "production"
  : ENV.NODE_ENV === "production";
export const isTest = isBrowser()
  ? process.env.NEXT_PUBLIC_NODE_ENV === "test"
  : ENV.NODE_ENV === "test";
