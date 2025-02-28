import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.string(),
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
    createdAt: v.optional(v.number()), // Timestamp for user creation
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_email", ["email"]), // Index for quick email lookups

  conversations: defineTable({
    participants: v.array(v.id("users")),
    isGroup: v.boolean(),
    groupName: v.optional(v.string()),
    groupImage: v.optional(v.string()),
    admin: v.optional(v.id("users")),
    createdAt: v.optional(v.number()), // Timestamp for conversation creation
  }),

  messages: defineTable({
    conversation: v.id("conversations"),
    sender: v.string(), // Kept as string for compatibility (e.g., AI bots)
    content: v.string(),
    messageType: v.union(
      v.literal("text"),
      v.literal("image"),
      v.literal("video"),
      v.literal("audio"), // Optional: add audio support
      v.literal("file") // Optional: add file/document support
    ),
    createdAt: v.optional(v.number()), // Timestamp for message creation
  }).index("by_conversation", ["conversation"]),
});
