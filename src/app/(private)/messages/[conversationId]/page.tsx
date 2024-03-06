import { SimpleHeader } from "@/components/headers/SimpleHeader";
import React from "react";
import { Chat } from "./components/chat/Chat";
import { CreateMessage } from "./components/create-message/CreateMessage";
import { ChatHeader } from "./components/chat/chat-header/ChatHeader";

interface Props {
  params: {
    conversationId: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="max-w-full lg:max-w-xl w-full lg:border-r max-h-dvh overflow-hidden h-full flex flex-col relative">
      <ChatHeader />
      <Chat />
      <CreateMessage />
    </div>
  );
};

export default page;
