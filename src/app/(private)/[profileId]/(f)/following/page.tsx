"use client";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { Prisma } from "@prisma/client";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useSWR from "swr";
import { FFollowing } from "../../components/f/f-following/FFollowing";
export type FollowingType = Prisma.FollowsGetPayload<{
  include: {
    recipient: {
      select: {
        avatar: true;
        name: true;
        id: true;
        username: true;
        _count: {
          select: {
            followers: true;
            following: true;
          };
        };
      };
    };
  };
}>;
interface Props {
  params: {
    profileId: string;
  };
}

const page = ({ params }: Props) => {
  const { data, setSize, size, isReachedEnd } = useInfinityLoad<FollowingType>(
    `/api/user/${params.profileId}/following`
  );
  // const {data} = useSWR(`/api/user/${params.profileId}/following`)
  console.log(data);
  return (
    <InfiniteScroll
      className="flex-1 w-full pb-20"
      loader={<Loader />}
      next={() => setSize(size + 1)}
      hasMore={!isReachedEnd}
      dataLength={data.length ?? 0}
      endMessage={<div className="py-40"></div>}
    >
      {data && data.length > 0 ? (
        data.map((el) => <FFollowing key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
          <span className="text-muted-foreground text-base text-center">
            There are currently no followings
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};

export default page;
