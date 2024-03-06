"use client";
import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
import { ConversationResponse } from "@/app/api/conversation/route";
import { SimpleHeader } from "@/components/headers/SimpleHeader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { cn } from "@/lib/utils";
// import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Message } from "./message/Message";
import { Loader } from "@/components/ui/loader";
import { ChatHeader } from "./chat-header/ChatHeader";
import { pusherClient } from "@/lib/pusher";
// import { useInfinityMessages } from "@/hooks/conversation/useInfinityMessages";
import { useConversationContext } from "@/context/ConversationContext";
import { InfinityScroll } from "@/components/ui/InfinityScroll";
import { DefaultAvatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { local } from "@/lib/local";
import { ChatPanel } from "./chat-panel/ChatPanel";
import { CreateMessage } from "../create-message/CreateMessage";

interface Props {}

export const Chat: FC<Props> = () => {
  // const params = useParams();
  // const { data, setSize, size, isReachedEnd, invalidate, isLoading, addMessage } =
  //   useInfinityMessages<MessageResponse>(`/api/conversation/${params.conversationId}/message`, 50, {
  //     revalidateOnFocus: false,
  //     revalidateOnReconnect: false,
  //     revalidateFirstPage: false,
  //   });
  // const newMessageHandle = (s: any) => {
  //   addMessage(s);
  //   console.log("here new message", s);
  // };
  // useEffect(() => {
  //   pusherClient.subscribe("message");
  //   pusherClient.bind("new_message", newMessageHandle);
  //   return () => {
  //     pusherClient.unsubscribe("message");
  //     pusherClient.unbind("new_message", newMessageHandle);
  //   };
  // }, []);
  const {
    conversation,
    messages,
    getNextMessages,
    recipients,
    isReachedMessage,
    isLoadingMessage,
    isInitLoadingMessage,
  } = useConversationContext();
  return (
    <InfinityScroll
      isReached={isReachedMessage}
      isLoading={isLoadingMessage}
      endMessage={<ChatPanel />}
      next={getNextMessages}
      inverse
      className="flex flex-col-reverse overflow-y-auto relative gap-1 pb-1 pt-12"
    >
      {/* <CreateMessage /> */}

      {isInitLoadingMessage ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        messages.map((el, index, arr) => {
          const sameUser = el.m.userId === arr[index - 1]?.m.userId;
          return <Message sameUser={sameUser} key={el.m.id} {...el} />;
        })
      )}
      {/* {conversation?.data?.type === "private" ? (
          <Link
            href={"/" + recipients[0]?.avatar}
            className="pt-20 w-full flex flex-col justify-center items-center hover:bg-accent mb-4"
          >
            <DefaultAvatar size={"md"} src={recipients[0]?.avatar ?? ""} />
            <span className="font-bold">{recipients[0]?.name}</span>
            <span className="text-muted-foreground text-sm !leading-3">
              @{recipients[0]?.username}
            </span>
            <div className="mt-4">
              <span className="text-muted-foreground text-sm !leading-3">
                Joined {local(recipients[0].createdAt).format("MMMM YYYY")}
              </span>
            </div>
            <Separator className="mt-14" />
          </Link>
        ) : (
          <div>this group</div>
        )} */}
    </InfinityScroll>
  );

  // return (
  //   <div
  //     id="scrollableDivChat"
  //     className="flex flex-col h-full overflow-y-auto"
  //     style={
  //       {
  //         // justifyContent: "start",
  //       }
  //     }
  //   >
  //     <InfiniteScroll
  //       className="flex flex-col-reverse gap-2"
  //       loader={<Loader />}
  //       next={getNextMessages}
  //       hasMore={true}
  //       dataLength={messages.length}
  //       scrollableTarget="scrollableDivChat"
  //       height={"100%"}
  //     >
  //       {/* <ChatHeader /> */}
  //       {messages.map((el, index, arr) => {
  //         const sameUser = el.userId === arr[index + 1]?.userId;
  //         return <Message sameUser={sameUser} key={el.id} {...el} />;
  //       })}
  //     </InfiniteScroll>
  //     {/* <InfiniteScroll
  //       className={cn("w-full flex flex-col pb-2")}
  //       loader={<Loader />}
  //       next={() => setSize(size + 1)}
  //       hasMore={!isReachedEnd}
  //       dataLength={data.length ?? 0}
  //       // endMessage={<div className="py-40"></div>}
  //       scrollableTarget="scrollableDivChat"
  //       height={"100%"}
  //     >
  //       <ChatHeader />
  //       <div className="px-4 flex flex-col-reverse gap-2 h-full">
  //         {data && data.length > 0 ? (
  //           data.map((el, index, arr) => {
  //             const sameUser = el.userId === arr[index + 1]?.userId;
  //             return <Message sameUser={sameUser} key={el.id} {...el} />;
  //           })
  //         ) : isReachedEnd && data && data.length === 0 ? (
  //           <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
  //             <span className="text-muted-foreground text-base text-center">
  //               You don't have any messages
  //             </span>
  //           </div>
  //         ) : null}
  //       </div>
  //     </InfiniteScroll> */}
  //   </div>
  // );
};
