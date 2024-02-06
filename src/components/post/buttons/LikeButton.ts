import { MouseEvent, useState } from "react";
import { PostType } from "../Post";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { LikeResponse } from "@/app/api/post/[postId]/like/route";
import { getMessageFromError } from "@/lib/utils";

interface ILikeButton {
  postId: any;
  post: PostType;
  invalidate?: (t: PostType) => void;
}

export const useLikeButton = ({ post, postId, invalidate }: ILikeButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const localChange = () => {
    if (invalidate) {
      invalidate({
        ...post,
        likes:
          post.likes.length === 0 ? [{ id: 1, postId, userId: session.data?.user.id ?? "dd" }] : [],
        _count: {
          ...post._count,
          likes: post.likes.length === 0 ? post._count.likes + 1 : post._count.likes - 1,
        },
      });
    }
  };
  const likeHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      localChange();
      const res: LikeResponse = await fetch(`/api/post/${postId}/like`, {
        method: "POST",
      }).then((res) => res.json());
      if (!res.success) {
        localChange();
        toast.error(res.message);
      }
    } catch (error: any) {
      localChange();
      const message = getMessageFromError(error);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    likeHandle,
  };
};
