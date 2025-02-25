import { ConversationType, Message } from "../types";

export const users = [
  {
    _id: "user1",
    name: "John Doe",
    email: "john@example.com",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    isOnline: true,
    admin: true,
  },
  {
    _id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    isOnline: false,
    admin: false,
  },
  {
    _id: "user3",
    name: "Alice Johnson",
    email: "alice@example.com",
    image: "",
    isOnline: true,
    admin: false,
  },
];

export const conversations: ConversationType[] = [
  {
    _id: "1",
    admin: "user1",
    groupImage: null,
    groupName: "Group A",
    participants: ["user1", "user2", "user3"],
    _creationTime: 1638232272,
    isOnline: true,
    lastMessage: {
      _id: "1",
      messageType: "text",
      content: "Hello everyone!",
      sender: "user1",
      _creationTime: 1638232272,
    },
  },
  {
    _id: "2",
    admin: null,
    groupImage: "https://avatars.githubusercontent.com/u/75279146?v=4",
    groupName: null,
    participants: ["user4", "user5"],
    _creationTime: 1638235872,
    isOnline: true,
    lastMessage: {
      _id: "2",
      messageType: "text",
      content: "Hey there!",
      sender: "user2",
      _creationTime: 1638235872,
    },
  },
];

export const messages: Message[] = [
  {
    _id: "m1",
    _creationTime: 1638232272,
    sender: "user1",
    messageType: "text",
    content: "Hello Group A!",
  },
  {
    _id: "m2",
    _creationTime: 1638232372,
    sender: "user2",
    messageType: "text",
    content: "Hi there!",
  },
  {
    _id: "m3",
    _creationTime: 1638232472,
    sender: "user3",
    messageType: "image",
    content: "image_url.jpg",
  },
];
