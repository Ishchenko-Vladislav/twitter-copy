"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useConversation } from "@/hooks/conversation/useConversation";
import { cn } from "@/lib/utils";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { FC } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Link from "next/link";
import { useConversationContext } from "@/context/ConversationContext";
interface Props {}

export const ChatHeader: FC<Props> = () => {
  const { back } = useRouter();
  const params = useParams();
  const { conversation, isLoadingConversation } = useConversationContext();
  // const { data, isLoading } = useConversation(params.conversationId as string);
  const session = useSession();
  return (
    <div className="w-full absolute shrink-0 top-0 h-12 bg-background/80 z-20 backdrop-blur-sm flex items-center gap-2 px-4">
      <Link
        href={"/messages"}
        className={cn(
          "w-8 h-8 rounded-full lg:hidden flex justify-center items-center h:hover:bg-gray-300 t:active:bg-gray-300 transition-colors"
        )}
      >
        <IoArrowBackOutline />
      </Link>

      {isLoadingConversation ? (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
      ) : (
        <div className="flex flex-col">
          {conversation && conversation.data && conversation.data.type === "private" ? (
            <h2 className="font-semibold text-base lg:text-lg  !leading-4 h-fit inline-block">
              {conversation.data.member.filter((el) => el.id !== session.data?.user.id)[0].name}
            </h2>
          ) : (
            <div>group</div>
          )}
          {/* <h2 className="font-semibold text-base lg:text-lg  !leading-4 h-fit inline-block">
            {title}
          </h2>
          {desc ? <div className="text-sm text-muted-foreground !leading-4">{desc}</div> : null} */}
        </div>
      )}

      <Button variant={"ghost"} className="rounded-full ml-auto" size={"icon"} asChild>
        <Link href={"/messages/" + params.conversationId + "/info"}>
          <IoIosInformationCircleOutline className="text-xl" />
        </Link>
      </Button>
    </div>
  );
};
