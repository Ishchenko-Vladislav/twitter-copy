"use client";
import { LikeResponse } from "@/app/api/post/[postId]/like/route";
import { PostResponse } from "@/app/api/post/[postId]/route";
import { Like } from "@/components/ui/like";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FC, MouseEvent, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
interface Props {
  isLiked: boolean;
  likesCount: number;
}

export const LikeButton: FC<Props> = ({ likesCount, isLiked }) => {
  const params = useParams();

  const localChange = () => {
    mutate(
      `/api/post/${params.postId}`,
      async (data: PostResponse | undefined) => {
        if (!data || !data.data) return data;
        const updated = {
          ...data,
          data: {
            ...data.data,
            likes: !!data.data.likes.length
              ? []
              : [
                  {
                    id: 1,
                    postId: parseInt(params.postId as string),
                    userId: session.data?.user.id ?? "",
                  },
                ],
            _count: {
              ...data.data._count,
              likes: !!data.data.likes.length
                ? data.data._count.likes - 1
                : data.data._count.likes + 1,
            },
          },
        } satisfies PostResponse;
        return updated;
      },
      {
        revalidate: false,
      }
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const likeHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      localChange();
      const res: LikeResponse = await fetch(`/api/post/${params.postId}/like`, {
        method: "POST",
      }).then((res) => res.json());
      if (!res.success) {
        localChange();
        toast.error(res.message);
      }
    } catch (error: any) {
      localChange();
      const message =
        typeof error === "string"
          ? error
          : "message" in error
          ? error.message
          : "Something went wrong. Try again!!!!!";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Like
      onClick={likeHandle}
      disabled={isLoading}
      isLiked={isLiked}
      likesCount={likesCount ?? 0}
    />
  );
};
