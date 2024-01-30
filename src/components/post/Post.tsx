"use client";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { FC, MouseEvent, MouseEventHandler, useState } from "react";
import { DefaultAvatar } from "../ui/avatar";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { local } from "@/lib/local";
import { Like } from "../ui/like";
import { Comment } from "../ui/comment";
import { Bookmark } from "../ui/bookmark";
import { useSession } from "next-auth/react";
import { useLikeButton } from "./buttons/LikeButton";
import { useBookmarkButton } from "./buttons/BookmarkButton";

export type PostType = Prisma.PostGetPayload<{
  include: {
    user: true;
    attachments: true;
    likes: true;
    bookmarks: true;
    _count: {
      select: {
        comments: true;
        likes: true;
        bookmarks: true;
      };
    };
  };
}>;
interface Props extends PostType {}

export const Post: FC<Props> = (props) => {
  const [data, setData] = useState({ ...props });
  const { push } = useRouter();
  const session = useSession();
  const handlePush = () => {
    push("/");
  };
  const isToday = local(data.createdAt).isToday();
  const { isLoading: isLoadingLike, likeHandle } = useLikeButton({ postId: data.id, setData });
  const { isLoading: isLoadingBookmark, bookmarkHandle } = useBookmarkButton({
    postId: data.id,
    setData,
  });
  const onClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={handlePush}
      className="w-full flex border-b border-border flex-row gap-2 py-2 px-4 hover:bg-accent relative cursor-pointer"
    >
      <DefaultAvatar src={data.user?.avatar ?? ""} />
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2 text-sm">
            <span className="font-semibold">{data.user?.name}</span>
            <span className="text-muted-foreground">@{data.user?.username}</span>
            <span>•</span>
            <span>
              {isToday ? local(data.createdAt).fromNow() : local(data.createdAt).format("MMM D")}
            </span>
          </div>
          <div>
            <span
              style={{
                wordBreak: "break-word",
              }}
              className="text-sm line-clamp-4 text-ellipsis"
            >
              {data.text}
            </span>
          </div>
        </div>
        <div
          className={cn("grid w-full gap-1 sm:gap-3 ", {
            ["hidden"]: data.attachments.length === 0,
            ["grid-cols-1"]: data.attachments.length === 1,
            ["grid-cols-2 aspect-video"]: data.attachments.length >= 2,
            ["grid-rows-2"]: data.attachments.length >= 3,
          })}
        >
          {data.attachments && !!data.attachments.length
            ? data.attachments.map((attach, index) => {
                return (
                  <div
                    key={attach.id}
                    className={cn("w-full overflow-hidden", {
                      ["row-span-2"]: data.attachments.length == 3 && index == 0,
                    })}
                  >
                    {attach.type === "image" ? (
                      <div
                        className={cn(" w-fit relative ", {
                          ["w-full h-full"]: data.attachments.length >= 2,
                        })}
                      >
                        <Image
                          className={cn("max-w-full  h-auto rounded-2xl ", {
                            ["max-h-[500px] object-contain w-fit"]: data.attachments.length === 1,
                            ["w-full h-full object-cover"]: data.attachments.length >= 2,
                          })}
                          width={600}
                          height={600}
                          src={attach.url ?? ""}
                          alt="image"
                        />
                      </div>
                    ) : attach.type === "video" ? (
                      <video
                        controls
                        muted
                        autoPlay
                        loop
                        className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                      >
                        <source className="object-contain" src={attach.url} />
                        {/* <source className="object-contain" src={attach.secureUrl} /> */}
                      </video>
                    ) : null}
                  </div>
                );
              })
            : null}
        </div>
        <div className="grid grid-cols-4 w-full -ml-2">
          <div onClick={onClick}>
            <Comment commentsCount={data._count.comments} />
          </div>
          <Like
            disabled={isLoadingLike}
            onClick={likeHandle}
            isLiked={!!data.likes.length}
            likesCount={data._count.likes}
          />
          <Bookmark
            disabled={isLoadingBookmark}
            onClick={bookmarkHandle}
            isMarked={!!data.bookmarks.length}
            bookmarksCount={data._count.bookmarks}
          />
        </div>
      </div>
    </div>
  );
};
