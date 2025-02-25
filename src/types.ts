// src/types.ts

export interface Message {
    _id: string;
    _creationTime: number;
    sender: string;
    messageType: "text" | "image" | "video";
    content: string;
  }
  
  export interface ConversationType {
    _id: string;
    admin?: string | null;
    groupImage?: string | null;
    groupName?: string | null;
    participants: string[];
    _creationTime: number;
    isOnline: boolean;
    isGroup?: boolean;
    lastMessage?: Message;
    sender?:string;
  }
  