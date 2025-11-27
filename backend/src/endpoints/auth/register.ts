import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().describe("User name"),
  email: z.string().email().describe("User email"),
  password: z.string().min(6).describe("User password"),
});

export class Register extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Register a new user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: registerSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User registered successfully",
      },
      "400": {
        description: "Invalid data or user already exists",
      },
    },
  };

  async handle(c: any) {
    const body = await c.req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);

    const db = c.env.DB;
    const { name, email, password } = parsed.data;

    // Check if user exists
    const existing = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existing) return c.json({ error: "User already exists" }, 400);

    // Insert user
    const result = await db.prepare(
      "INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)"
    ).bind(name, email, password, 0).run();

    return c.json({ success: true, message: "User registered successfully" });
  }
}
