import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api"; // ✅ Correct import

const http = httpRouter(); // ✅ Declare only once

// Define a type for webhook response
interface WebhookResponse {
  type: "user.created" | "user.updated" | "session.created" | "session.ended";
  data: {
    id?: string;
    user_id?: string;
    email_addresses?: { email_address: string }[];
    first_name?: string;
    last_name?: string;
    image_url?: string;
  };
}

http.route({ // ✅ No duplicate 'http' declaration
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const payloadString = await req.text();
    const headerPayload = req.headers;

    try {
      console.log("🔹 Webhook received, verifying...");
      
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id") || "",
          "svix-signature": headerPayload.get("svix-signature") || "",
          "svix-timestamp": headerPayload.get("svix-timestamp") || "",
        },
      }) as WebhookResponse; // ✅ Type assertion

      console.log("✅ Webhook verified successfully:", result);

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.id}`,
            email: result.data.email_addresses?.[0]?.email_address || "",
            name: `${result.data.first_name ?? "Guest"} ${result.data.last_name ?? ""}`.trim(),
            image: result.data.image_url || "",
          });
          break;

        case "user.updated":
          await ctx.runMutation(internal.users.updateUser, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.id}`,
            image: result.data.image_url || "",
          });
          break;

        case "session.created":
          await ctx.runMutation(internal.users.setUserOnline, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.user_id}`,
          });
          break;

        case "session.ended":
          await ctx.runMutation(internal.users.setUserOffline, {
            tokenIdentifier: `${process.env.CLERK_APP_DOMAIN}|${result.data.user_id}`,
          });
          break;
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      console.error("🔥 Webhook verification failed:", error);
      return new Response("Webhook Error", { status: 400 });
    }
  }),
});

export default http;
