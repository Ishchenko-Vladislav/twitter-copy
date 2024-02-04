"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useFollow } from "@/hooks/user/useFollow";
import { useFollowing } from "@/hooks/user/useFollowing";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { FC } from "react";
// import useSWRMutation from "swr/mutation";
import { Loader2 } from "lucide-react";
import { useSWRConfig } from "swr";
import { useSession } from "next-auth/react";
// interface Tr exted
interface Props extends ButtonProps {
  profileId: string;
  withInvalidate?: boolean;
  invalidateKey?: string;
  onSuccess?: (i: boolean) => void;
}

export const FollowButton: FC<Props> = ({
  profileId,
  withInvalidate = false,
  invalidateKey,
  onSuccess,
  className,
  ...attr
}) => {
  //   const { data, error } = useFollowing();
  const session = useSession();
  const { toggleFollow, isFollow, isLoading } = useFollow(profileId as string, {
    withInvalidate,
    invalidateKey,
    onSuccess,
  });

  if (profileId === session.data?.user.id) return null;
  return (
    <Button
      onClick={toggleFollow}
      disabled={isLoading}
      variant={isFollow ? "outline" : "default"}
      className={cn("rounded-full font-semibold", {
        ["hover:bg-red-100/80 hover:text-red-500 hover:border-red-500 group"]: isFollow,
        className,
      })}
      {...attr}
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
