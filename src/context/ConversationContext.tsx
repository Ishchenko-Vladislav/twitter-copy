"use client";

import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
import { GetConversationResponse } from "@/app/api/conversation/[conversationId]/route";
import { ConversationResponse } from "@/app/api/conversation/route";
import { useConversation } from "@/hooks/conversation/useConversation";
import { IMessage, useMessages } from "@/hooks/conversation/useMessages";
import { pusherClient } from "@/lib/pusher";
import { User } from "@prisma/client";
// import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { io } from "socket.io-client";
interface IConversationContext {
  messages: IMessage[];
  conversation: GetConversationResponse | undefined;
  getNextMessages: () => void;
  recipients: User[];
  isReachedMessage: boolean;
  isLoadingMessage: boolean;
}
export const ConversationContext = createContext({} as IConversationContext);

export const useConversationContext = () => {
  const context = useContext(ConversationContext);
  if (!context) {
    console.log(" error in useConversationContext");
  }
  return context;
};

export const ConversationProvider: FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();
  const session = useSession();
  const { data, isLoading } = useConversation(params.conversationId as string);
  // const [messages, setMessages] = useState()
  const {
    messages,
    getNextMessages,
    isReached,
    isLoading: isLoadingMessage,
    addMEssage,
  } = useMessages(params.conversationId as string);
  const recipients = useMemo(() => {
    return data?.data?.member.filter((el) => el.id !== session.data?.user.id) ?? [];
  }, [data]);

  const newMessageHandle = (s: MessageResponse) => {
    if (Number(params.conversationId) === s.conversationId) {
      addMEssage(s);
    }
    console.log(s);
  };
  useEffect(() => {
    pusherClient.subscribe("message");
    pusherClient.bind("new_message", newMessageHandle);
    return () => {
      pusherClient.unsubscribe("message");
      pusherClient.unbind("new_message", newMessageHandle);
    };
  }, []);

  return (
    <ConversationContext.Provider
      value={{
        conversation: data,
        messages,
        getNextMessages,
        recipients,
        isReachedMessage: isReached,
        isLoadingMessage,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
