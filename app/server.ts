import { serve, serverTLS } from "https://deno.land/std@0.82.0/http/server.ts";

const server = serverTLS({
  hostname: "0.0.0.0",
  port: 8080,
  certFile: "./cert.pem",
  keyFile: "./private.pem",
});

console.log(`https://127.0.0.1:8080/`);

for await (const req of server) {
  console.log(req.url);
  const headers = new Headers();

  headers.append("content-type", "application/json");

  req.respond({
    headers: headers,
    body: JSON.stringify({ users: "nakazawa", id: 123432 }),
  });
}
