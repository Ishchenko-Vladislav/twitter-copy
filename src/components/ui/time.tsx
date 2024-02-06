"use client";
import { FC, PropsWithChildren } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { local } from "@/lib/local";
interface Props {
  date: Date;
}

export const Time: FC<PropsWithChildren<Props>> = ({ children, date }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="bg-foreground/70 rounded-sm text-background w-fit text-xs py-0.5 px-1">
        {local(date).format("h:mm A • MMM D, YYYY")}
      </HoverCardContent>
    </HoverCard>
  );
};
