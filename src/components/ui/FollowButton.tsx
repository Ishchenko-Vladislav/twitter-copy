"use client";
import { Button } from "@/components/ui/button";
import { useFollow } from "@/hooks/user/useFollow";
import { useFollowing } from "@/hooks/user/useFollowing";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { FC } from "react";
// import useSWRMutation from "swr/mutation";
import { Loader2 } from "lucide-react";
import { useSWRConfig } from "swr";
interface Props {
  profileId: string;
}

export const FollowButton: FC<Props> = ({ profileId }) => {
  //   const { data, error } = useFollowing();
  const { toggleFollow, isFollow, isLoading } = useFollow(profileId as string, {
    withInvalidate: true,
  });

  return (
    <Button
      onClick={toggleFollow}
      disabled={isLoading}
      variant={isFollow ? "outline" : "default"}
      className={cn("rounded-full font-semibold w-28", {
        ["hover:bg-red-100/80 hover:text-red-500 group"]: isFollow,
      })}
    >
      {!isLoading ? (
        isFollow ? (
          <>
            <span className="group-hover:hidden block">Following</span>
            <span className="group-hover:block hidden">Unfollow</span>
          </>
        ) : (
          <span>Follow</span>
        )
      ) : (
        <div>
          <Loader2 className="animate-spin" />
        </div>
      )}
    </Button>
  );
};
