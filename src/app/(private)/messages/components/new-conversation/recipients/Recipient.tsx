"use client";
// import { AvatarIconPrototype } from "@/components/ui/avatar/Avatar";
// import { useConversation } from "@/context/ConversationContext";
// import { IConversation } from "@/services/conversation/conversation.interface";
// import { ConversationService } from "@/services/conversation/conversation.service";
// import { IUser } from "@/services/user/user.interface";
// import { cn } from "@/utils/utils";
// import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { cn } from "@/lib/utils";
import { DefaultAvatar } from "@/components/ui/avatar";
import { CreateConversationDTO, CreateConversationResponse } from "@/app/api/conversation/route";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
export const Recipient = (user: User) => {
  //   const { addConversation, conversation } = useConversation();
  const session = useSession();
  const { push } = useRouter();
  const ref = useRef<HTMLButtonElement>(null);
  const createConservation = async (userId: string) => {
    if (!session.data?.user.id) {
      return toast.error("You are should be logged in.");
    }
    const data: CreateConversationDTO = {
      type: "private",
      members: [
        {
          id: session.data?.user.id,
        },
        {
          id: user.id,
        },
      ],
    };
    const res: CreateConversationResponse = await fetch("/api/conversation", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
    console.log("CREATE CONVERSATION", res);
  };
  return (
    <>
      <button
        onClick={() => createConservation(user.id)}
        key={user.id}
        className={cn(
          "flex gap-2 px-4 py-2 hover:bg-secondary max-w-full w-full transition-colors items-center"
        )}
      >
        <div>
          <DefaultAvatar className="w-10 h-10" src={user.avatar ?? ""} />
        </div>
        <div className={cn("flex flex-col overflow-hidden", {})}>
          <div className="flex flex-col !leading-5 items-start text-sm md:text-base">
            <div>
              <span className="font-bold ">{user.name}</span>
            </div>
            <div className="overflow-hidden truncate">
              <span className="text-muted-foreground text-sm">@{user.username}</span>
            </div>
          </div>
          <div></div>
        </div>
      </button>
      <DialogClose ref={ref} />
    </>
  );
};
