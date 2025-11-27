import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2).describe("User full name"),
  email: z.string().email().describe("User email"),
  password: z.string().min(6).describe("User password (min 6 chars)"),
  phone: z.string().optional().describe("User phone number"),
  address: z.string().optional().describe("User address"),
  gender: z.enum(["Male", "Female", "Other"]).optional().describe("User gender"),
  date_of_birth: z.string().optional().describe("User date of birth (YYYY-MM-DD)"),
});

export class Register extends OpenAPIRoute {
  schema = {
    tags: ["Auth"],
    summary: "Register a new user with profile information",
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
    if (!parsed.success) return c.json({ error: "Invalid data", details: parsed.error.errors }, 400);

    const db = c.env.DB;
    const { name, email, password, phone, address, gender, date_of_birth } = parsed.data;

    // Hash password before storing
    async function hashPassword(pw: string) {
      const enc = new TextEncoder();
      const data = enc.encode(pw);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    const hashedPassword = await hashPassword(password);

    // Check if user exists
    const existing = await db.prepare("SELECT id FROM users WHERE email = ?").bind(email).first();
    if (existing) return c.json({ error: "User already exists with this email" }, 400);

    // Insert user with all fields
    try {
      const result = await db.prepare(
        `INSERT INTO users (name, email, password, phone, address, gender, date_of_birth, is_admin) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).bind(name, email, hashedPassword, phone || null, address || null, gender || null, date_of_birth || null, 0).run();

      return c.json({ 
        success: true, 
        message: "User registered successfully",
        user: {
          id: result.meta.last_row_id,
          name,
          email,
          phone: phone || null,
          address: address || null,
          gender: gender || null,
          date_of_birth: date_of_birth || null,
        }
      });
    } catch (err: any) {
      return c.json({ error: "Registration failed", details: err.message }, 500);
    }
  }
}
