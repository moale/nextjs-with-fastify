// NOTE: https://github.com/sindresorhus/ky/issues/336
const withTM = require("next-transpile-modules")(["ky"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withTM(nextConfig);
