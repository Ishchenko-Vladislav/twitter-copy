"use client";
import { CreateMessageDTO } from "@/app/api/conversation/[conversationId]/message/route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateMessage } from "@/hooks/conversation/useCreateMessage";
import { Loader2 } from "lucide-react";
import { IoSend } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import ReactTextAreaAutoSize from "react-textarea-autosize";
interface Props {}

export const CreateMessage: FC<Props> = () => {
  const params = useParams();
  const { text, setText, createMessage, isLoading } = useCreateMessage(
    params.conversationId as string
  );
  //   const session = useSession();
  //   const [text, setText] = useState("");
  //   const createMessage = async () => {
  // try {
  //   const data: CreateMessageDTO = {
  //     conversationId: params.conversationId as string,
  //     text,
  //   };
  //   const res = await fetch(`/api/conversation/${params.conversationId}/message`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //   });
  //   console.log(res)
  // } catch (error) {

  // }
  //   };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    createMessage();
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      createMessage();
    }
  };
  return (
    <div className="w-full p-2 border-t">
      <form
        onSubmit={submit}
        className="relative border border-border flex items-center justify-between px-2 rounded-2xl gap-1 xs:gap-3 h-min"
      >
        <ReactTextAreaAutoSize
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxRows={6}
          rows={1}
          onKeyDown={handleKeyPress}
          minRows={1}
          placeholder="Start a new message"
          className="rounded-xl resize-none no-scrollbar border-none flex-1 p-2 bg-transparent focus-visible:ring-0 ring-0 !focus-visible:shadow-none focus-visible:outline-none"
        />
        <Button
          disabled={text.length === 0}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <IoSend className="text-primary" />}
        </Button>
      </form>
    </div>
  );
};
