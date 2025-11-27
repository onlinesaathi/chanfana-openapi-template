import { OpenAPIRoute } from "chanfana";
import { z } from "zod";

const verifySchema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

function bufferToHex(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export class RazorpayVerify extends OpenAPIRoute {
  schema = {
    tags: ["Payments"],
    summary: "Verify Razorpay payment signature",
    request: {
      body: {
        content: {
          "application/json": { schema: verifySchema },
        },
      },
    },
    responses: {
      "200": { description: "Verified" },
      "400": { description: "Invalid data or signature" },
    },
  };

  async handle(c: any) {
    const body = await c.req.json();
    const parsed = verifySchema.safeParse(body);
    if (!parsed.success) return c.json({ error: "Invalid data" }, 400);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
    const secret = c.env.RAZORPAY_KEY_SECRET;
    if (!secret) return c.json({ error: "Razorpay secret not configured" }, 500);

    try {
      const msg = `${razorpay_order_id}|${razorpay_payment_id}`;
      const enc = new TextEncoder().encode(secret);
      const key = await crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      const signatureBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
      const expected = bufferToHex(signatureBuf);

      if (expected !== razorpay_signature) {
        return c.json({ verified: false }, 400);
      }

      // Optionally: record payment in DB (omitted here) or update order status
      return c.json({ verified: true });
    } catch (err: any) {
      return c.json({ error: err.message || String(err) }, 500);
    }
  }
}
