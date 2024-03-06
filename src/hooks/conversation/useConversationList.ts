import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
import { GetConversationResponse } from "@/app/api/conversation/[conversationId]/route";
import { ConversationResponse } from "@/app/api/conversation/route";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
export const useConversationList = () => {
  const [conversations, setConversations] = useState<ConversationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [isReached, setIsReached] = useState(false);
  const session = useSession();
  const TAKE = 20;
  const conversationRef = useRef(conversations);
  const getConversations = async () => {
    try {
      setIsInitLoading(true);
      setIsReached(false);
      await fetch(`/api/conversation?take=${TAKE}`)
        .then((res) => res.json())
        .then((res) => {
          if (!res || res.length < TAKE) {
            setIsReached(true);
          }
          setConversations(res);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsInitLoading(false);
    }
  };
  const getNextConversations = async () => {
    if (isLoading || isReached) return;
    try {
      setIsLoading(true);
      await fetch(
        `/api/conversation?take=${TAKE}&date=${conversations[conversations.length - 1].updatedAt}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.length < TAKE) {
            setIsReached(true);
          }
          setConversations((prev) => [...prev, ...res]);
        });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const addNewConversation = async (m: MessageResponse) => {
    const res: GetConversationResponse = await fetch("/api/conversation/" + m.conversationId).then(
      (res) => res.json()
    );
    if (res.success && res.data) {
      console.log(res);
      const c: any = res.data;
      setConversations((prev) => {
        return [c, ...prev];
      });
    }
  };
  const updateConversationList = async (m: MessageResponse) => {
    if (conversationRef.current.find((el) => el.id === m.conversationId)) {
      setConversations((prev) =>
        prev.map((el) => {
          if (el.id === m.conversationId) {
            return {
              ...el,
              lastMessageSend: m,
              lastMessageSendId: m.id,
            };
          } else {
            return el;
          }
        })
      );
    } else {
      addNewConversation(m);
    }
  };
  useEffect(() => {
    getConversations();
    updateConversationList.bind(conversations);
  }, []);
  useEffect(() => {
    conversationRef.current = conversations;
  }, [conversations]);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      setConversations([]);
      setIsReached(false);
    }
  }, [session]);

  return {
    isLoading,
    isReached,
    isInitLoading,
    conversations,
    getNextConversations,
    updateConversationList,
  };
};
