"use client";
import { MessageResponse } from "@/app/api/conversation/[conversationId]/message/route";
import { IMessage } from "@/hooks/conversation/useMessages";
import { local } from "@/lib/local";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef } from "react";
import { Scale } from "./Scale";

interface Props extends IMessage {
  sameUser: boolean;
}

export const Message: FC<Props> = ({ sameUser, ...message }) => {
  const session = useSession();

  return (
    <Scale isScale={message.animate}>
      <div
        className={cn("flex items-end gap-2 transition-all px-2", {
          ["flex-row-reverse"]: message.m.userId === session.data?.user.id,
        })}
      >
        <div
          style={{
            wordBreak: "break-word",
          }}
          className={cn(
            "py-2 px-4 rounded-3xl bg-primary text-primary-foreground w-fit max-w-[80%] whitespace-pre-wrap",
            {
              ["rounded-br-sm"]: !sameUser && message.m.userId === session.data?.user.id,
              ["rounded-bl-sm"]: !sameUser && message.m.userId != session.data?.user.id,
            }
          )}
        >
          {message.m.text}
        </div>
        <div
          className={cn("text-sm text-muted-foreground flex gap-2 flex-wrap", {
            ["flex-row-reverse"]: message.m.userId === session.data?.user.id,
          })}
        >
          <span>{message.m.seen ? "seen" : "unseen"}</span>
          <span>{local(message.m.createdAt)?.format("ddd h:mm A")}</span>
        </div>
      </div>
    </Scale>
  );
};
