"use client";
import { Post, PostType } from "@/components/post/Post";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  params: {
    profileId: string;
  };
}

const page = ({ params }: Props) => {
  const { data, setSize, size, isReachedEnd } = useInfinityLoad<PostType>(
    `/api/user/${params.profileId}/likes`
  );
  return (
    <InfiniteScroll
      className="flex-1 w-full pb-20"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
    >
      {data && data.length > 0 ? (
        data.map((el) => <Post key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
          {/* <span className="text-xl font-semibold text-center">
            Here you can see the posts of people you are subscribed to
          </span> */}
          <span className="text-muted-foreground text-base text-center">
            There are currently no posts
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};

export default page;
