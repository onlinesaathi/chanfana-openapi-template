import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const createOrderSchema = z.object({
  amount: z.number().positive().describe("Amount in rupees"),
  currency: z.string().optional().describe("Currency (defaults to INR)"),
  receipt: z.string().optional().describe("Receipt id / reference"),
});

export class RazorpayCreateOrder extends OpenAPIRoute {
  schema = {
    tags: ["Payments"],
    summary: "Create a Razorpay order",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createOrderSchema,
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Razorpay order created",
      },
      "400": { description: "Invalid data" },
      "500": { description: "Razorpay error" },
    },
  };

  async handle(c: any) {
    const body = await c.req.json();
    const parsed = createOrderSchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);

    const { amount, currency = "INR", receipt } = parsed.data;

    const keyId = c.env.RAZORPAY_KEY_ID;
    const keySecret = c.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return c.json({ error: "Razorpay keys not configured" }, 500);

    // Razorpay expects amount in smallest currency unit (paise)
    const amountPaise = Math.round(amount * 100);

    const auth = btoa(`${keyId}:${keySecret}`);

    try {
      const resp = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountPaise, currency, receipt, payment_capture: 1 }),
      });

      const data = await resp.json();
      if (!resp.ok) return c.json({ error: data }, 500);

      return c.json({ success: true, order: data });
    } catch (err: any) {
      return c.json({ error: err.message || String(err) }, 500);
    }
  }
}
