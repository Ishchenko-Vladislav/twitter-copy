"use client";
import { DefaultAvatar } from "@/components/ui/avatar";
import { Bookmark } from "@/components/ui/bookmark";
import { Comment } from "@/components/ui/comment";
import { Like } from "@/components/ui/like";
import { Loader } from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Time } from "@/components/ui/time";
import { usePost } from "@/hooks/post/usePost";
import { local } from "@/lib/local";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { IoClose } from "react-icons/io5";
import { LikeButton } from "./buttons/like-button/LikeButton";
import { BookmarkButton } from "./buttons/bookmark-button/BookmarkButton";

const Post = () => {
  const params = useParams();

  const { data, isLoading, error } = usePost(params.postId as string);
  if (isLoading) {
    return <Loader />;
  }
  if (error || !data?.data) {
    return <div>error</div>;
  }

  return (
    <div className="w-full flex flex-col gap-2 px-4">
      <div className="flex gap-2 items-center">
        <Link href={"/" + data?.data?.user?.id}>
          <DefaultAvatar src={data?.data?.user?.avatar ?? ""} />
        </Link>
        <div className="flex flex-col ">
          <Link
            href={"/" + data?.data?.user?.id}
            className="text-foreground font-semibold !leading-5"
          >
            {data?.data?.user?.name}
          </Link>
          <Link
            href={"/" + data?.data?.user?.id}
            className="text-sm text-muted-foreground !leading-4"
          >
            @{data?.data?.user?.username}
          </Link>
        </div>
      </div>
      <div>
        <span
          style={{
            wordBreak: "break-word",
          }}
          className="text-sm whitespace-pre-wrap"
        >
          {data.data.text}
        </span>
      </div>
      <div
        className={cn("grid w-full gap-1 sm:gap-3 ", {
          ["hidden"]: data.data.attachments.length === 0,
          ["grid-cols-1"]: data.data.attachments.length === 1,
          ["grid-cols-2 aspect-video"]: data.data.attachments.length >= 2,
          ["grid-rows-2"]: data.data.attachments.length >= 3,
        })}
      >
        {data.data.attachments && !!data.data.attachments.length
          ? data.data.attachments.map((attach, index) => {
              return (
                <div
                  key={attach.id}
                  className={cn("w-full overflow-hidden", {
                    ["row-span-2"]: data.data!.attachments.length == 3 && index == 0,
                  })}
                >
                  {attach.type === "image" ? (
                    <div
                      className={cn(" w-fit relative ", {
                        ["w-full h-full"]: data.data!.attachments.length >= 2,
                      })}
                    >
                      <Image
                        className={cn("max-w-full  h-auto rounded-2xl ", {
                          ["max-h-[500px] object-contain w-fit"]:
                            data.data!.attachments.length === 1,
                          ["w-full h-full object-cover"]: data.data!.attachments.length >= 2,
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
      <div>
        <Time date={data.data.createdAt}>
          <span className="text-sm text-muted-foreground hover:underline cursor-pointer">
            {local(data.data.createdAt).format("h:mm A • MMM D, YYYY")}
          </span>
        </Time>
      </div>
      <Separator />
      <div className="grid grid-cols-4 -ml-2">
        <Comment commentsCount={data.data._count.comments} />
        <LikeButton isLiked={!!data.data.likes.length} likesCount={data.data._count.likes} />
        <BookmarkButton
          bookmarksCount={data.data._count.bookmarks}
          isMarked={!!data.data.bookmarks.length}
        />
      </div>
      <Separator />
    </div>
  );
};

export default Post;
