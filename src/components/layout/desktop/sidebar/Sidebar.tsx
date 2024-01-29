"use client";
// import { useUsers } from "@/hooks/user/useUsers";
import Link from "next/link";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage, DefaultAvatar } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { useUsers } from "@/hooks/user/useUsers";
interface Props {}

export const Sidebar: FC<Props> = () => {
  const { data: users, isLoading, isError } = useUsers();
  console.log(users, isLoading, isError);
  return (
    <div className="hidden lg:flex max-w-80 w-full h-fit border-x border-border flex-col min-h-dvh sticky top-0">
      <div className="flex-1 px-4 py-2">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full rounded-xl py-3 bg-secondary/50 flex flex-col gap-4">
            <div className="font-bold px-3">You might know</div>
            <div>
              {!isError &&
                !!users &&
                users.map((user) => (
                  <Link
                    key={user.id}
                    href={"/" + user.id}
                    className="w-full py-2 px-3 gap-3 hover:bg-slate-200 transition-colors flex items-center"
                  >
                    <DefaultAvatar src={user.avatar ?? ""} />
                    <div className="flex flex-col overflow-hidden text-sm items-start">
                      <div className="truncate font-semibold">
                        <span>{user.name}</span>
                      </div>
                      <div className="truncate text-muted-foreground">
                        <span>@{user.username}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
