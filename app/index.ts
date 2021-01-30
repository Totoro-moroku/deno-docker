import {
  Application,
  Router,
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { Item } from "./seeds.ts";

import { findItem, updateItem } from "./controller/item.ts";

const port: number = 8080;

const router = new Router();

const items = new Map<string, Item[]>();

items.set("1234", [
  {
    id: "1234",
    name: "ほん",
    rate: 5000,
  },
]);

router
  .get("/", (context: RouterContext) => {
    context.response.body = `
    <!DOCTYPE html>
      <html>
        <body>
          <h1>Body type: "${context}"</h1>
        </body>
      </html>
    `;
  })
  .post("/update", updateItem)
  .post("/find", findItem);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
