import { MouseEvent, useState } from "react";
import { PostType } from "../Post";
import { useSession } from "next-auth/react";
interface IBookmarkButton {
  postId: any;
  post: PostType;
  invalidate?: (t: PostType) => void;
}
export const useBookmarkButton = ({ invalidate, postId, post }: IBookmarkButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const bookmarkHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
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
      await fetch(`/api/post/${postId}/bookmark`, {
        method: "POST",
      }).then((res) => res.json());
      // if (invalidate) {
      //   invalidate({
      //     ...post,
      //     bookmarks: res.isMarked ? [res.bookmark] : [],
      //     _count: {
      //       ...post._count,
      //       bookmarks: res.isMarked ? post._count.bookmarks + 1 : post._count.bookmarks - 1,
      //     },
      //   });
      // }
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    bookmarkHandle,
  };
};
