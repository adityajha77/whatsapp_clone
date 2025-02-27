"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Video, X } from "lucide-react";
import MessageInput from "./message-input";
import MessageContainer from "./message-container";
import ChatPlaceHolder from "./chat-placeholder";
import GroupMembersDialog from "./group-members-dialog";

const RightPanel = () => {
  const selectedConversation = { id: 1, name: "John Doe", isGroup: true }; // Example conversation

  if (!selectedConversation) return <ChatPlaceHolder />;

  return (
    <div className='w-3/4 flex flex-col'>
      <div className='w-full sticky top-0 z-50'>
        {/* Header */}
        <div className='flex justify-between bg-gray-primary p-3'>
          <div className='flex gap-3 items-center'>
            <Avatar>
              <AvatarImage src={"/placeholder.png"} className='object-cover' />
              <AvatarFallback>
                <div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full' />
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col'>
              <p>{selectedConversation.name}</p>
              {selectedConversation.isGroup && <GroupMembersDialog />}
            </div>
          </div>

          <div className='flex items-center gap-7 mr-5'>
            <a href='/video-call' target='_blank'>
              <Video size={23} />
            </a>
            <X size={16} className='cursor-pointer' />
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <MessageContainer />

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default RightPanel;
