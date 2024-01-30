"use client";
import { Loader } from "@/components/ui/loader";
import { useInfinityLoad } from "@/hooks/useInfinityLoad";
import { Prisma } from "@prisma/client";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FFollowers } from "../../components/f-followers/FFollowers";
export type FollowersType = Prisma.FollowsGetPayload<{
  include: {
    user: {
      select: {
        avatar: true;
        name: true;
        id: true;
        username: true;
        _count: {
          select: {
            following: true;
            followers: true;
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
  const { data, setSize, size, isReachedEnd } = useInfinityLoad<FollowersType>(
    `/api/user/${params.profileId}/followers`
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
        data.map((el) => <FFollowers key={el.id} {...el} />)
      ) : isReachedEnd && data && data.length === 0 ? (
        <div className="w-full flex justify-center items-center flex-col max-w-sm mx-auto gap-2 px-4 py-4">
          <span className="text-muted-foreground text-base text-center">
            There are currently no followers
          </span>
        </div>
      ) : null}
    </InfiniteScroll>
  );
};

export default page;
