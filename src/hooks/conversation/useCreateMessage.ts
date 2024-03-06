import { CreateMessageDTO } from "@/app/api/conversation/[conversationId]/message/route";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const useCreateMessage = (conversationId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");
  const session = useSession();
  const createMessage = async () => {
    try {
      if (text.trim().length === 0) return;
      setIsLoading(true);
      const data: CreateMessageDTO = {
        conversationId: conversationId,
        text,
      };
      const res = await fetch(`/api/conversation/${conversationId}/message`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      setText("");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    text,
    setText,
    createMessage,
    isLoading,
  };
};
