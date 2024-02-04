"use client";
import { SimpleHeader } from "@/components/headers/SimpleHeader";
import { useUser } from "@/hooks/user/useUser";
import { NextPage } from "next";
import React from "react";
import { ProfileClient } from "../components/profile-client/ProfileClient";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { Post, PostType } from "@/components/post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";

interface Props {
  params: {
    profileId: string;
  };
}

const page: NextPage<Props> = ({ params }) => {
  const { user, isError, isLoading } = useUser(params.profileId as string);

  const { data, setSize, size, isReachedEnd, invalidate } = useInfinityLoad<PostType>(
    `/api/user/${params.profileId}/post`
  );

  return (
    <InfiniteScroll
      className={cn("flex-1 w-full pb-20", {
        hidden: !user || !user.id,
      })}
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
      endMessage={<div className="py-40"></div>}
    >
      {data && data.length > 0 ? (
        data.map((el) => <Post invalidate={invalidate} key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
          <span className="text-muted-foreground text-base text-center">
            There are currently no posts
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};

export default page;
