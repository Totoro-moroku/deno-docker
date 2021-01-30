import { Item } from "./../seeds.ts";
import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";

const ItemsDB = new Map<string, Item>();

ItemsDB.set("1", {
  id: "1",
  name: "book",
  rate: 5000,
});

ItemsDB.set("2", {
  id: "2",
  name: "bottle of water",
  rate: 150,
});

ItemsDB.set("3", {
  id: "3",
  name: "apple",
  rate: 3000,
});

interface Get {
  id: string;
}

export const findItems = async (context: RouterContext) => {
  const request = context.request;

  if (!request.hasBody) {
    context.throw(Status.BadRequest, "request of the body is null.");
  }

  const body = await context.request.body();

  let item: Partial<Get> | undefined;

  if (body.type === "json") {
    item = await body.value;
  } else {
    context.throw(Status.BadRequest, "request of type is not json.");
  }

  if (item) {
    context.assert(item.id && typeof item.id === "string", Status.BadRequest);

    const value = ItemsDB.get(item.id);

    context.response.status = Status.OK;
    context.response.body = value;
    context.response.type = "json";

    return;
  }
};
