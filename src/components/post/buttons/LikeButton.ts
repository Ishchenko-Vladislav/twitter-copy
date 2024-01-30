import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import { PostType } from "../Post";
interface ILikeButton {
  postId: string | number;
  setData: Dispatch<SetStateAction<PostType>>;
}
export const useLikeButton = ({ postId, setData }: ILikeButton) => {
  const [isLoading, setIsLoading] = useState(false);
  const likeHandle = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsLoading(true);
      const res = await fetch(`/api/post/${postId}/like`, {
        method: "POST",
      }).then((res) => res.json());
      if (res.isLiked) {
        setData((prev) => ({
          ...prev,
          likes: [res.like],
          _count: {
            ...prev._count,
            likes: ++prev._count.likes,
          },
        }));
      } else {
        setData((prev) => ({
          ...prev,
          likes: [],
          _count: {
            ...prev._count,
            likes: --prev._count.likes,
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
    likeHandle,
  };
};
