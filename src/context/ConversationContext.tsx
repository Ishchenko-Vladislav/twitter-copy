"use client";

import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
import type {
  GetConversationResponse,
  ConversationResponse as CR,
} from "@/app/api/conversation/[conversationId]/route";
import { ConversationResponse } from "@/app/api/conversation/route";
// import { ConversationResponse } from "@/app/api/conversation/route";
import { useConversation } from "@/hooks/conversation/useConversation";
import { useConversationList } from "@/hooks/conversation/useConversationList";
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
  conversations: ConversationResponse[];
  getNextMessages: () => void;
  getNextConversations: () => void;
  recipients: CR["member"];
  isReachedMessage: boolean;
  isLoadingMessage: boolean;
  isInitLoadingMessage: boolean;
  isLoadingConversation: boolean;
  isLoadingConversationList: boolean;
  isReachedConversationList: boolean;
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
    isInitLoading: isInitLoadingMessage,
  } = useMessages(params.conversationId as string);
  // const { data: Conversations, setSize, size, isReachedEnd, invalidate, isLoading: isLoadingConversations } =
  //   useInfinityLoad<ConversationResponse>(`/api/conversation`);
  const {
    conversations,
    isInitLoading,
    getNextConversations,
    updateConversationList,
    isLoading: isLoadingConversationList,
    isReached: isReachedConversationList,
  } = useConversationList();
  const recipients = useMemo(() => {
    return data?.data?.member ?? [];
    // return data?.data?.member.filter((el) => el.id !== session.data?.user.id) ?? [];
  }, [data]);

  const newMessageHandle = (s: MessageResponse, c: any) => {
    if (Number(params.conversationId) === s.conversationId) {
      addMEssage(s);
    }
    updateConversationList(s);
    // console.log(s, c);
  };
  useEffect(() => {
    pusherClient.subscribe("message");
    return () => {
      pusherClient.unsubscribe("message");
    };
  }, []);
  useEffect(() => {
    pusherClient.bind("new_message", newMessageHandle);
    return () => {
      pusherClient.unbind("new_message");
    };
  }, [params.conversationId]);

  return (
    <ConversationContext.Provider
      value={{
        conversation: data,
        messages,
        getNextMessages,
        recipients,
        getNextConversations,
        isReachedMessage: isReached,
        isLoadingMessage,
        isLoadingConversation: isLoading,
        isInitLoadingMessage,
        conversations,
        isLoadingConversationList,
        isReachedConversationList,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
