import { OpenAPIRoute } from "chanfana";

export class ListOrders extends OpenAPIRoute {
  schema = {
    tags: ["Admin Orders"],
    summary: "List all orders",
    responses: {
      "200": {
        description: "List of orders",
      },
    },
  };

  async handle(c: any) {
    const db = c.env.DB;
    const orders = await db.prepare("SELECT * FROM orders").all();
    return c.json(orders.results || []);
  }
}

export class DeleteOrder extends OpenAPIRoute {
  schema = {
    tags: ["Admin Orders"],
    summary: "Delete an order",
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        schema: { type: "number" },
      },
    ],
    responses: {
      "200": {
        description: "Order deleted successfully",
      },
    },
  };

  async handle(c: any) {
    const id = c.req.param("id");
    const db = c.env.DB;
    await db.prepare("DELETE FROM orders WHERE id = ?").bind(id).run();
    return c.json({ success: true });
  }
}

