import { ConversationResponse } from "@/app/api/conversation/route";
import { DefaultAvatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";

interface Props extends ConversationResponse {
  invalidate: (i: ConversationResponse) => void;
}

export const Conversation: FC<Props> = ({ invalidate, ...data }) => {
  const session = useSession();
  const recipient = data?.member?.filter((r) => r.id !== session.data?.user.id);
  return (
    <Link
      href={"/messages/" + data.id}
      className="px-4 w-full py-2 hover:bg-accent flex items-center gap-2 cursor-pointer"
    >
      <div>
        {recipient && recipient.length === 1 ? (
          <DefaultAvatar src={recipient[0].avatar ?? ""} />
        ) : (
          <DefaultAvatar src={recipient[0].avatar ?? ""} />
        )}
      </div>
      <div className="!leading-4 justify-center flex flex-col overflow-hidden">
        {data.type === "private" ? (
          <div className="font-bold">{recipient[0].name}</div>
        ) : (
          <div>group name</div>
        )}
        <div className="text-sm !leading-5 truncate overflow-hidden">last message</div>
      </div>
    </Link>
  );
};
