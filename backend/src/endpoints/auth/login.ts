import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().describe("User email"),
  password: z.string().describe("User password"),
});

export class Login extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Login user",
    request: {
      body: {
        content: {
          "application/json": {
            schema: loginSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Login successful",
      },
      "401": {
        description: "Invalid credentials",
      },
    },
  };

  async handle(c: any) {
    const body = await c.req.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);

    const db = c.env.DB;
    const { email, password } = parsed.data;

    // Find user
    const user = await db.prepare(
      "SELECT id, name, email, is_admin FROM users WHERE email = ? AND password = ?"
    ).bind(email, password).first();

    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    return c.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
    });
  }
}
