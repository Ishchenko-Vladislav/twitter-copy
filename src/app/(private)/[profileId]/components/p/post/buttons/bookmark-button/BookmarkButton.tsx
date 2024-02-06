"use client";
import { BookmarkResponse } from "@/app/api/post/[postId]/bookmark/route";
import { PostResponse } from "@/app/api/post/[postId]/route";
import { Bookmark } from "@/components/ui/bookmark";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { mutate } from "swr";
interface Props {
  bookmarksCount: number;
  isMarked: boolean;
}
export const BookmarkButton: FC<Props> = ({ bookmarksCount, isMarked }) => {
  const params = useParams();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handle = async () => {
    setIsLoading(true);
    try {
      localChange();
      const res: BookmarkResponse = await fetch(`/api/post/${params.postId}/bookmark`, {
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
  const localChange = () => {
    mutate(
      `/api/post/${params.postId}`,
      async (data: PostResponse | undefined) => {
        if (!data || !data.data) return data;
        const updated = {
          ...data,
          data: {
            ...data.data,
            bookmarks: !!data.data.bookmarks.length
              ? []
              : [
                  {
                    createdAt: new Date(),
                    id: 1,
                    postId: parseInt(params.postId as string),
                    userId: session.data?.user.id ?? "",
                  },
                ],
            _count: {
              ...data.data._count,
              bookmarks: !!data.data.bookmarks.length
                ? data.data._count.bookmarks - 1
                : data.data._count.bookmarks + 1,
            },
          },
        } satisfies BookmarkResponse;
        console.log("MUTATE --1", data);
        return updated;
      },
      {
        revalidate: false,
      }
    );
  };
  return (
    <Bookmark
      disabled={isLoading}
      onClick={handle}
      isMarked={isMarked}
      bookmarksCount={bookmarksCount}
    />
  );
};
