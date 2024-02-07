"use client";
// import { useUsers } from "@/hooks/user/useUsers";
import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage, DefaultAvatar } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { useUsers } from "@/hooks/user/useUsers";
import { User } from "@/components/user/User";
import { MightKnow } from "./might-know/MightKnow";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
interface Props {}

export const Sidebar: FC<Props> = () => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "hidden lg:flex max-w-80 w-full h-fit border-l border-border flex-col min-h-dvh sticky top-0",
        {
          ["!hidden"]: !!pathname.startsWith("/messages"),
        }
      )}
    >
      <div className="flex-1 px-4 py-2">
        <div className="w-full flex flex-col gap-4">
          <MightKnow />
        </div>
      </div>
    </div>
  );
};
