import {
  Application,
  Router,
  RouterContext,
  Status,
} from "https://deno.land/x/oak/mod.ts";

const port: number = 8080;

const router = new Router();

interface Item {
  id: string;
  name: string;
  rate: number;
}

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
  .post("/update", async (context: RouterContext) => {
    /**
     * @memo ここでbodyを検証しなかった場合は throw
     */
    if (!context.request.hasBody) {
      context.throw(Status.BadRequest, "bodyが入ってないよ！！！！！！！");
    }

    const body = context.request.body();

    console.log({ body: body });

    let item: Partial<Item> | undefined;

    if (body.type === "json") {
      item = await body.value;
      console.log(item);
    } else {
      context.throw(Status.BadRequest, "jsonじゃないよ！！！！！");
    }

    if (item) {
      console.log("post item");

      context.assert(item.id && typeof item.id === "string", Status.BadRequest);

      items.set(item.id, item as Item[]);

      context.response.status = Status.OK;
      context.response.body = item;
      context.response.type = "json";

      console.log(items);
      return;
    }
  });

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port });
