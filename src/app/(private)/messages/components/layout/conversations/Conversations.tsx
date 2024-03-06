"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { LuMailPlus } from "react-icons/lu";
// import { ConvContainer } from "./conv-container/ConvContainer";
import { NewConversation } from "../../new-conversation/NewConversation";
import { InfinityScroll } from "@/components/ui/InfinityScroll";
// import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { ConversationResponse } from "@/app/api/conversation/route";
import { cn } from "@/lib/utils";
import { Conversation } from "./conversation/Conversation";
import { usePathname } from "next/navigation";
import { useConversationContext } from "@/context/ConversationContext";

interface Props {}

// export const Conversations: FC<Props> = () => {
//   return (
//     <div className="w-full border-r flex flex-col gap-2 h-full max-h-dvh overflow-hidden">
//       <div className="w-full h-12 px-4 flex justify-between items-center">
//         <div>
//           <span className="text-lg font-bold">Messages</span>
//         </div>
//         <NewConversation asChild>
//           <Button variant={"ghost"} size={"icon"} className="rounded-full">
//             <LuMailPlus className="text-lg" />
//           </Button>
//         </NewConversation>
//       </div>
//       <div className="px-4 mb-4">
//         <Input placeholder="Search Direct Messages" type="text" className="rounded-full" />
//       </div>
//       <ConvContainer />
//     </div>
//   );
// };
export const Conversations: FC<Props> = () => {
  const pathname = usePathname();
  // const { data, setSize, size, isReachedEnd, invalidate, isLoading } =
  //   useInfinityLoad<ConversationResponse>(`/api/conversation`);
  const {
    conversations,
    isLoadingConversationList,
    isReachedConversationList,
    getNextConversations,
  } = useConversationContext();
  return (
    <div
      id="scrollableDiv"
      className={cn(
        "h-full max-h-dvh flex flex-col lg:border-r lg:max-w-xs max-w-[600px] w-full border-r ",
        {
          "hidden lg:flex": pathname.startsWith("/messages/"),
        }
      )}
    >
      <InfinityScroll
        className={cn("w-full flex-1 max-h-dvh overflow-x-hidden")}
        isLoading={isLoadingConversationList}
        next={getNextConversations}
        isReached={isReachedConversationList}
        // hasMore={!isReachedConversationList}
        // dataLength={data.length ?? 0}
        endMessage={<div className="py-40"></div>}
      >
        <div className="w-full h-12 px-4 flex justify-between items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10">
          <div>
            <span className="text-lg font-bold">Messages</span>
          </div>
          <NewConversation asChild>
            <Button variant={"ghost"} size={"icon"} className="rounded-full">
              <LuMailPlus className="text-lg" />
            </Button>
          </NewConversation>
        </div>
        <div className="px-4 mb-4">
          <Input placeholder="Search Direct Messages" type="text" className="rounded-full" />
        </div>
        {conversations && conversations.length > 0 ? (
          conversations.map((el) => <Conversation key={el.id} {...el} />)
        ) : isReachedConversationList && conversations && conversations.length === 0 ? (
          <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
            <span className="text-muted-foreground text-base text-center">
              You haven't a conversation
            </span>
          </div>
        ) : null}
        {isLoadingConversationList ? <Loader /> : null}
      </InfinityScroll>
    </div>
  );
};
