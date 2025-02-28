import { internalAction } from "./_generated/server";
import { Webhook } from "svix"; // ✅ Use svix for webhook verification
import { v } from "convex/values";

const WEB_HOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

if (!WEB_HOOK_SECRET) {
  throw new Error("CLERK_WEBHOOK_SECRET is not defined in environment variables");
}

export const fulfill = internalAction({
  args: {
    headers: v.object({
      "svix-id": v.string(),
      "svix-signature": v.string(),
      "svix-timestamp": v.string(),
    }),
    payload: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const wh = new Webhook(WEB_HOOK_SECRET);
      const payload = wh.verify(args.payload, args.headers);
      return payload;
    } catch (error) {
      console.error("Webhook verification failed:", error);
      throw new Error("Invalid webhook signature");
    }
  },
});
