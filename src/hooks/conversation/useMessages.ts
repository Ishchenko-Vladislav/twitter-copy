import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
// import { Message } from "postcss";
import { useEffect, useState } from "react";
export interface IMessage {
  m: MessageResponse;
  animate: boolean;
}
export const useMessages = (conversationId: string | null) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);
  const TAKE = 20;
  const getMessages = async () => {
    if (!conversationId) return;
    try {
      setIsInitLoading(true);
      setIsReached(false);
      await fetch(`/api/conversation/${conversationId}/message?take=${TAKE}`)
        .then((res) => res.json())
        .then((res) => {
          if (!res || res.length < TAKE) {
            setIsReached(true);
          }
          const filter: IMessage[] = res.map((el: MessageResponse) => ({
            m: el,
            animate: false,
          }));
          setMessages(filter);
        });
    } catch (error) {
    } finally {
      setIsInitLoading(false);
    }
  };
  const getNextMessages = async () => {
    if (!conversationId || isLoading || isReached) return;
    try {
      setIsLoading(true);
      await fetch(
        `/api/conversation/${conversationId}/message?take=${TAKE}&date=${
          messages[messages.length - 1].m.createdAt
        }`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.length < TAKE) {
            setIsReached(true);
          }
          const filter: IMessage[] = res.map((el: MessageResponse) => ({
            m: el,
            animate: false,
          }));
          setMessages((prev) => [...prev, ...filter]);
        });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const addMEssage = (s: MessageResponse) => {
    setMessages((prev) => [
      {
        m: s,
        animate: true,
      },
      ...prev,
    ]);
  };
  const clearMessages = async () => {
    setMessages([]);
    return true;
  };
  useEffect(() => {
    getMessages();
  }, [conversationId]);
  return {
    isLoading,
    messages,
    isReached,
    getNextMessages,
    addMEssage,
    isInitLoading,
  };
};
