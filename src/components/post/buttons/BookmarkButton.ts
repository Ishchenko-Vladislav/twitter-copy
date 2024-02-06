import { MouseEvent, useState } from "react";
import { PostType } from "../Post";
import { useSession } from "next-auth/react";
import { BookmarkResponse } from "@/app/api/post/[postId]/bookmark/route";
import toast from "react-hot-toast";
interface IBookmarkButton {
  postId: any;
  post: PostType;
  invalidate?: (t: PostType) => void;
}
export const useBookmarkButton = ({ invalidate, postId, post }: IBookmarkButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const localChange = () => {
    if (invalidate) {
      invalidate({
        ...post,
        bookmarks:
          post.bookmarks.length === 0
            ? [
                {
                  id: 1,
                  postId,
                  userId: session.data?.user.id ?? "dd",
                  createdAt: new Date(),
                },
              ]
            : [],
        _count: {
          ...post._count,
          bookmarks:
            post.bookmarks.length === 0 ? post._count.bookmarks + 1 : post._count.bookmarks - 1,
        },
      });
    }
  };
  const bookmarkHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      localChange();
      const res: BookmarkResponse = await fetch(`/api/post/${postId}/bookmark`, {
        method: "POST",
      }).then((res) => res.json());
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
  return {
    isLoading,
    bookmarkHandle,
  };
};
