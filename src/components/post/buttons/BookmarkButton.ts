import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { PostType } from "../Post";
interface IBookmarkButton {
  postId: string | number;
  setData: Dispatch<SetStateAction<PostType>>;
}
export const useBookmarkButton = ({ postId, setData }: IBookmarkButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const bookmarkHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const res = await fetch(`/api/post/${postId}/bookmark`, {
        method: "POST",
      }).then((res) => res.json());
      if (res.isMarked) {
        setData((prev) => ({
          ...prev,
          bookmarks: [res.bookmark],
          _count: {
            ...prev._count,
            bookmarks: ++prev._count.bookmarks,
          },
        }));
      } else {
        setData((prev) => ({
          ...prev,
          bookmarks: [],
          _count: {
            ...prev._count,
            bookmarks: --prev._count.bookmarks,
          },
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    bookmarkHandle,
  };
};
