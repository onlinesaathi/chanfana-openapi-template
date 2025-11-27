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
    // Hash incoming password to compare with stored hash
    async function hashPassword(pw: string) {
      const enc = new TextEncoder();
      const data = enc.encode(pw);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    const hashed = await hashPassword(password);

    const user = await db.prepare(
      "SELECT id, name, email, is_admin FROM users WHERE email = ? AND password = ?"
    ).bind(email, hashed).first();

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
