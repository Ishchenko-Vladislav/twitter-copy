"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { LuMailPlus } from "react-icons/lu";
import { ConvContainer } from "./conv-container/ConvContainer";
import { NewConversation } from "../../new-conversation/NewConversation";
interface Props {}

export const Conversations: FC<Props> = () => {
  return (
    <div className="w-full border-r flex flex-col">
      <div className="w-full h-12 px-4 flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">Messages</span>
        </div>
        <NewConversation asChild>
          <Button variant={"ghost"} size={"icon"} className="rounded-full">
            <LuMailPlus className="text-lg" />
          </Button>
        </NewConversation>
      </div>
      <div className="px-4">
        <Input placeholder="Search Direct Messages" type="text" className="rounded-full" />
      </div>
      <ConvContainer />
    </div>
  );
};
