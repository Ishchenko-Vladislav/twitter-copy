"use client";
import { ConversationResponse, GetConversationResponse } from "@/app/api/conversation/route";
import { PostType } from "@/components/post/Post";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { cn } from "@/lib/utils";
// import { ConversationType } from '@prisma/client';
import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Conversation } from "./conversation/Conversation";
// import { Conversation } from "../Conversations";

interface Props {}

export const ConvContainer: FC<Props> = () => {
  const { data, setSize, size, isReachedEnd, invalidate } =
    useInfinityLoad<ConversationResponse>(`/api/conversation`);

  return (
    <InfiniteScroll
      className={cn("flex-1 w-full pb-20")}
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
      endMessage={<div className="py-40"></div>}
    >
      {data && data.length > 0 ? (
        data.map((el) => <Conversation invalidate={invalidate} key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
          <span className="text-muted-foreground text-base text-center">
            You haven't a conversation
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};
