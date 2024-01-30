"use client";
import { DefaultAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { FC, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Progress } from "./progress/Progress";
import { useCreatePost } from "@/hooks/post/useCreatePost";
import { FaRegImage } from "react-icons/fa6";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { LuLoader, LuLoader2 } from "react-icons/lu";
interface Props {}

export const CreatePost: FC<Props> = () => {
  // const [text, setText]
  const { data } = useSession();
  const {
    text,
    setText,
    isPendingPost,
    isDisabledButton,
    accept,
    attachments,
    uploadFile,
    remove,
    sendPost,
  } = useCreatePost();
  return (
    <div className="w-full pb-4 pt-2 border-b border-border">
      <div className="w-full flex items-start gap-2 px-4">
        <DefaultAvatar src={data?.user.avatar ?? ""} />
        <div className="flex flex-col relative w-full gap-2">
          <div className="w-full relative z-10">
            <TextareaAutosize
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full resize-none py-1 focus-within:outline-none outline-none"
              placeholder="What is happening?!"
              maxLength={500}
            />
          </div>
          <div
            className={cn("w-full grid gap-1 sm:gap-3", {
              ["min-h-32"]: attachments.length > 0,
              ["grid-cols-1"]: attachments.length === 1,
              ["grid-cols-2 aspect-video"]: attachments.length >= 2,
              ["grid-rows-2"]: attachments.length >= 3,
            })}
          >
            {attachments && attachments.length > 0
              ? attachments.map((el, index) => (
                  <div
                    className={cn("relative", {
                      ["row-span-2"]: index === 0 && attachments.length === 3,
                    })}
                  >
                    <div
                      onClick={() => remove(el.public_id)}
                      className="w-6 z-10 h-6  rounded-full flex justify-center items-center bg-background text-foreground border cursor-pointer transition-colors hover:bg-accent border-foreground absolute top-2 right-2"
                    >
                      <IoClose />
                    </div>
                    {el.resource_type === "image" ? (
                      <div
                        className={cn("relative w-fit h-full", {
                          ["w-full h-full"]: attachments.length >= 2,
                        })}
                      >
                        <Image
                          className={cn("max-w-full  h-full rounded-2xl ", {
                            ["max-h-[500px] object-contain w-fit"]: attachments.length == 1,
                            ["w-full h-full object-cover"]: attachments.length >= 2,
                          })}
                          width={600}
                          height={600}
                          src={el.secure_url ?? el.url ?? ""}
                          alt="image"
                        />
                      </div>
                    ) : el.resource_type === "video" ? (
                      <video
                        controls
                        muted
                        autoPlay
                        loop
                        className="object-contain w-full aspect-square bg-black rounded-2xl h-full"
                      >
                        <source className="object-contain" src={el.url} />
                        <source className="object-contain" src={el.secure_url} />
                      </video>
                    ) : null}
                  </div>
                ))
              : null}
          </div>
          <div className="flex items-center w-full justify-between gap-2">
            <Button size={"icon"} variant={"ghost"} className="rounded-full cursor-pointer" asChild>
              <label htmlFor="new-file">
                <input
                  onChange={uploadFile}
                  accept={accept}
                  id="new-file"
                  className="hidden"
                  type="file"
                  multiple
                />
                <FaRegImage />
              </label>
            </Button>
            <div className="flex items-center gap-2">
              <Progress currentCount={text.length} maxCount={500} />
              <Button
                onClick={() => sendPost()}
                disabled={isDisabledButton || isPendingPost}
                className="rounded-full disabled:opacity-50"
              >
                {isPendingPost ? (
                  <div>
                    <LuLoader2 className="animate-spin" />
                  </div>
                ) : (
                  <span>Post</span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
