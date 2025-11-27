import { ApiException, fromHono } from "chanfana";
import { Hono } from "hono";
import { ContentfulStatusCode } from "hono/utils/http-status";
import { ListProducts, CreateProduct, UpdateProduct, DeleteProduct } from "./endpoints/admin/products";
import { ListOrders, DeleteOrder } from "./endpoints/admin/orders";
import { ListUsers, DeleteUser } from "./endpoints/admin/users";
import { Register } from "./endpoints/auth/register";
import { Login } from "./endpoints/auth/login";
import { RazorpayCreateOrder } from "./endpoints/payments/razorpayCreateOrder";
import { RazorpayVerify } from "./endpoints/payments/razorpayVerify";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

app.onError((err, c) => {
  if (err instanceof ApiException) {
    // If it's a Chanfana ApiException, let Chanfana handle the response
    return c.json(
      { success: false, errors: err.buildResponse() },
      err.status as ContentfulStatusCode,
    );
  }

  console.error("Global error handler caught:", err); // Log the error if it's not known

  // For other errors, return a generic 500 response
  return c.json(
    {
      success: false,
      errors: [{ code: 7000, message: "Internal Server Error" }],
    },
    500,
  );
});

// Setup OpenAPI registry. Docs are available at `/openapi`.
const openapi = fromHono(app, {
  docs_url: "/openapi",
  schema: {
    info: {
      title: "GenZmart API",
      version: "2.0.0",
      description: "This is the documentation for GenZmart API.",
    },
  },
});

// Register auth endpoints
openapi.post("/auth/register", Register as unknown as any);
openapi.post("/auth/login", Login as unknown as any);

// Register admin endpoints
openapi.get("/admin/products", ListProducts as unknown as any);
openapi.post("/admin/products", CreateProduct as unknown as any);
openapi.put("/admin/products/:id", UpdateProduct as unknown as any);
openapi.delete("/admin/products/:id", DeleteProduct as unknown as any);

openapi.get("/admin/orders", ListOrders as unknown as any);
openapi.delete("/admin/orders/:id", DeleteOrder as unknown as any);

openapi.get("/admin/users", ListUsers as unknown as any);
openapi.delete("/admin/users/:id", DeleteUser as unknown as any);

// Payments
openapi.post("/payments/razorpay/create-order", RazorpayCreateOrder as unknown as any);
openapi.post("/payments/razorpay/verify", RazorpayVerify as unknown as any);

// Serve a minimal static homepage at `/` that links to the OpenAPI docs at `/openapi`
// Redirect root to the OpenAPI docs
app.get("/", (c) => c.redirect("/openapi"));

// Catch-all 404 for undefined routes
app.all("*", (c) =>
  c.html(
    `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>404 - Not Found</title>
        <style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#fee2e2;color:#7f1d1d} .card{background:white;border-radius:8px;padding:40px;box-shadow:0 10px 25px rgba(127,29,29,.15);max-width:600px;text-align:center;border-left:5px solid #dc2626} h1{margin:0 0 10px;font-size:48px;color:#dc2626} p{margin:10px 0;font-size:16px;color:#374151} a{display:inline-block;margin-top:20px;padding:10px 20px;background:#dc2626;color:white;text-decoration:none;border-radius:6px;font-weight:bold;transition:background 0.3s} a:hover{background:#b91c1c}</style>
      </head>
      <body>
        <div class="card">
          <h1>404</h1>
          <h2 style="margin:5px 0 15px;font-size:24px;color:#374151">Page Not Found</h2>
          <p>The endpoint you're looking for doesn't exist.</p>
          <p style="font-size:14px;color:#6b7280"><code>${c.req.path}</code></p>
          <a href="/openapi">View API Documentation</a>
        </div>
      </body>
    </html>`,
    404,
  )
);

// Export the Hono app
export default app;
