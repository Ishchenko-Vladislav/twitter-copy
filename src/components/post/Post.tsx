"use client";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import { DefaultAvatar } from "../ui/avatar";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { local } from "@/lib/local";

export type PostType = Prisma.PostGetPayload<{
  include: {
    user: true;
    attachments: true;
  };
}>;
interface Props extends PostType {}

export const Post: FC<Props> = ({ user, attachments, createdAt, text }) => {
  const { push } = useRouter();
  const handlePush = () => {
    push("/");
  };
  const isToday = local(createdAt).isToday();
  return (
    <div
      onClick={handlePush}
      className="w-full flex flex-row gap-2 py-2 px-4 hover:bg-accent relative cursor-pointer"
    >
      <DefaultAvatar src={user?.avatar ?? ""} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2 text-sm">
            <span className="font-semibold">{user?.name}</span>
            <span className="text-muted-foreground">{user?.username}</span>
            <span>•</span>
            <span>{isToday ? local(createdAt).fromNow() : local(createdAt).format("MMM D")}</span>
          </div>
          <div>
            <span
              style={{
                wordBreak: "break-word",
              }}
              className="text-sm line-clamp-4 text-ellipsis"
            >
              {text}
            </span>
          </div>
        </div>
        <div
          className={cn("grid w-full gap-1 sm:gap-3 ", {
            ["grid-cols-1"]: attachments.length === 1,
            ["grid-cols-2 aspect-video"]: attachments.length >= 2,
            ["grid-rows-2"]: attachments.length >= 3,
          })}
        >
          {attachments && !!attachments.length
            ? attachments.map((attach, index) => {
                return (
                  <div
                    key={attach.id}
                    className={cn("w-full overflow-hidden", {
                      ["row-span-2"]: attachments.length == 3 && index == 0,
                    })}
                  >
                    {attach.type === "image" ? (
                      <div
                        className={cn(" w-fit relative ", {
                          ["w-full h-full"]: attachments.length >= 2,
                        })}
                      >
                        <Image
                          className={cn("max-w-full  h-auto rounded-2xl ", {
                            ["max-h-[500px] object-contain w-fit"]: attachments.length === 1,
                            ["w-full h-full object-cover"]: attachments.length >= 2,
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
        {/* {
          attachments && attachments.length > 0 ? attachments.map(el => (
            <div>
              {
                el.type === 'image' ? (
                  <Image width={600} height={600} src={el.url} alt="" />
                ) : (
                  <video>
                    <source />
                  </video>
                )
              }
            </div>
          )) : null
        } */}
      </div>
    </div>
  );
};
