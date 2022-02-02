import ky, { HTTPError } from "ky";

const http = ky.create({
  prefixUrl: "/api",
  headers: {
    accept: "appication/json;charset=utf-8",
  },
});

export { http, HTTPError };
