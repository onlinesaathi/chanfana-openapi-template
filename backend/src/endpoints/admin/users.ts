import { OpenAPIRoute } from "chanfana";

export class ListUsers extends OpenAPIRoute {
  schema = {
    tags: ["Admin Users"],
    summary: "List all users",
    responses: {
      "200": {
        description: "List of users",
      },
    },
  };

  async handle(c: any) {
    const db = c.env.DB;
    const users = await db.prepare("SELECT id, name, email, is_admin, created_at FROM users").all();
    return c.json(users.results || []);
  }
}

export class DeleteUser extends OpenAPIRoute {
  schema = {
    tags: ["Admin Users"],
    summary: "Delete a user",
    parameters: [
      {
        // ParameterObject: use literal types for `in` and `schema.type`
        name: "id",
        in: "path" as const,
        required: true,
        schema: {
          type: "integer" as const,
          format: "int64",
        },
        description: "ID of the user to delete",
      },
    ],
    responses: {
      "200": {
        description: "User deleted successfully",
        content: {
          "application/json": {
            schema: {
              type: "object" as const,
              properties: {
                success: { type: "boolean" as const },
              },
            },
          },
        },
      },
      "404": {
        description: "User not found",
      },
    },
  };

  async handle(c: any) {
    const id = c.req.param("id");
    const db = c.env.DB;
    await db.prepare("DELETE FROM users WHERE id = ?").bind(id).run();
    return c.json({ success: true });
  }
}

