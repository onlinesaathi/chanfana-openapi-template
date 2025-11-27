import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().describe("Product name"),
  description: z.string().optional().describe("Product description"),
  price: z.number().describe("Product price"),
  stock: z.number().describe("Product stock quantity"),
  image_url: z.string().optional().describe("Product image URL"),
});

export class ListProducts extends OpenAPIRoute {
  schema = {
    tags: ["Admin Products"],
    summary: "List all products",
    responses: {
      "200": {
        description: "List of products",
      },
    },
  };

  async handle(c: any) {
    const db = c.env.DB;
    const products = await db.prepare("SELECT * FROM products").all();
    return c.json(products.results || []);
  }
}

export class CreateProduct extends OpenAPIRoute {
  schema = {
    tags: ["Admin Products"],
    summary: "Create a new product",
    request: {
      body: {
        content: {
          "application/json": {
            schema: productSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Product created successfully",
      },
    },
  };

  async handle(c: any) {
    const body = await c.req.json();
    const parsed = productSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);
    
    const db = c.env.DB;
    const { name, description, price, stock, image_url } = parsed.data;
    await db.prepare(
      "INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, description, price, stock, image_url).run();
    
    return c.json({ success: true });
  }
}

export class UpdateProduct extends OpenAPIRoute {
  schema = {
    tags: ["Admin Products"],
    summary: "Update a product",
    responses: {
      "200": {
        description: "Product updated successfully",
      },
    },
  };

  async handle(c: any) {
    const id = c.req.param("id");
    const body = await c.req.json();
    const parsed = productSchema.partial().safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);
    
    const db = c.env.DB;
    const fields = Object.entries(parsed.data).filter(([_, v]) => v !== undefined);
    if (fields.length === 0) return c.json({ error: "No fields to update" }, 400);
    
    const setClause = fields.map(([k]) => `${k} = ?`).join(", ");
    const values = fields.map(([_, v]) => v);
    await db.prepare(`UPDATE products SET ${setClause} WHERE id = ?`).bind(...values, id).run();
    
    return c.json({ success: true });
  }
}

export class DeleteProduct extends OpenAPIRoute {
  schema = {
    tags: ["Admin Products"],
    summary: "Delete a product",
    responses: {
      "200": {
        description: "Product deleted successfully",
      },
    },
  };

  async handle(c: any) {
    const id = c.req.param("id");
    const db = c.env.DB;
    await db.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
    return c.json({ success: true });
  }
}

