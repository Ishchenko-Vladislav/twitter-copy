import { GetConversationResponse } from "@/app/api/conversation/[conversationId]/route";
import { ConversationResponse } from "@/app/api/conversation/route";
import { fetcher } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import useSWR from "swr";
interface IConversationInfo {
  type: ConversationResponse["type"];
  name: string;
}
export const useConversation = (conversationId: string) => {
  return useSWR<GetConversationResponse>(
    conversationId ? `/api/conversation/${conversationId}` : null,
    fetcher
  );
};
