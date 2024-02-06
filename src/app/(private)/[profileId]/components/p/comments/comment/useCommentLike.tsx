import { LikeToCommentResponse } from "@/app/api/post/[postId]/comment/[commentId]/like/route";
import { CommentResponse, TComment } from "@/app/api/post/[postId]/comment/route";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  // commentId: any;
  // postId: any
  // post: PostType;
  // invalidate?: (t: PostType) => void;
  invalidate?: (t: TComment) => void;
  comment: TComment;
}
export const useCommentLike = ({ invalidate, comment }: IProps) => {
  const params = useParams();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const localChange = () => {
    if (invalidate) {
      invalidate({
        ...comment,
        likes:
          comment.likes.length === 0
            ? [
                {
                  id: 1,
                  commentId: comment.id,
                  userId: session.data?.user.id ?? "dd",
                },
              ]
            : [],
        _count: {
          ...comment._count,
          likes: comment.likes.length === 0 ? comment._count.likes + 1 : comment._count.likes - 1,
        },
      });
    }
  };

  const likeHandle = async () => {
    try {
      setIsLoading(true);
      localChange();
      const res: LikeToCommentResponse = await fetch(
        `/api/post/${params.postId}/comment/${comment.id}/like`,
        {
          method: "POST",
        }
      ).then((res) => res.json());
      if (!res.success) {
        localChange();
        toast.error(res.message);
      }
    } catch (error) {
      localChange();
    } finally {
      setIsLoading(false);
    }
  };
  return { likeHandle, isLoading };
};
