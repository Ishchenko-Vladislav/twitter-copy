import { DefaultAvatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useConversationContext } from "@/context/ConversationContext";
import { local } from "@/lib/local";
import Link from "next/link";
import { FC } from "react";

interface Props {}

export const ChatPanel: FC<Props> = () => {
  const { conversation, recipients } = useConversationContext();
  return (
    <div>
      {conversation?.data?.type === "private" ? (
        <Link
          href={"/" + recipients[0]?.id}
          className="pt-20 w-full flex flex-col justify-center items-center hover:bg-accent mb-4"
        >
          <DefaultAvatar size={"md"} src={recipients[0]?.avatar ?? ""} />
          <span className="font-bold">{recipients[0]?.name}</span>
          <span className="text-muted-foreground text-sm !leading-3">
            @{recipients[0]?.username}
          </span>
          <div className="mt-4">
            <span className="text-muted-foreground text-sm !leading-3">
              Joined {local(recipients[0].createdAt).format("MMMM YYYY")}
            </span>
          </div>
          <Separator className="mt-14" />
        </Link>
      ) : (
        <div>this group</div>
      )}
    </div>
  );
};
