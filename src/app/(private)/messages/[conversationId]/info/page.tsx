"use client";
import { SimpleHeader } from "@/components/headers/SimpleHeader";
import { useConversationContext } from "@/context/ConversationContext";
import { useConversation } from "@/hooks/conversation/useConversation";
import React from "react";
import { InfinityScroll } from "@/components/ui/InfinityScroll";
import { User } from "@/components/user/User";

interface Props {}

const page = (props: Props) => {
  const { recipients } = useConversationContext();
  return (
    <div className="border-r border-border w-full h-full">
      <SimpleHeader title="Conversation info" withArrow />
      {recipients.map((recipient) => (
        <User
          key={recipient.id}
          user={{
            avatar: recipient.avatar,
            id: recipient.id,
            name: recipient.name,
            username: recipient.username,
            _count: {
              followers: recipient._count.followers,
              following: recipient._count.following,
            },
          }}
        />
      ))}
    </div>
  );
};

export default page;
