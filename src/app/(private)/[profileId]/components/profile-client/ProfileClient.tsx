"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { FC } from "react";
import { DefaultAvatar } from "@/components/ui/avatar";
import { FaRegCalendarAlt } from "react-icons/fa";
import dayjs from "dayjs";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/user/useUser";
import { FollowButton } from "@/components/ui/FollowButton";
import { UpdateProfile } from "./update-profile/UpdateProfile";
import { User } from "@prisma/client";
import Image from "next/image";
interface Props {}

export const ProfileClient: FC<Props> = () => {
  const params = useParams();
  const { user, isError, isLoading } = useUser(params.profileId as string);
  const { data } = useSession();
  console.log("session", data);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (isError) {
    return <div>error</div>;
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col w-full">
        <div className="w-full h-52 bg-slate-300 relative">
          {!!user?.bg ? <Image fill src={user?.bg ?? ""} alt="" className="object-cover" /> : null}
        </div>
        <div className="w-full flex items-end justify-between px-4 -mt-[4.5rem]">
          <DefaultAvatar src={user?.avatar ?? ""} size={"large"} />
          <div className="pb-6">
            {data && data.user.id === params.profileId ? (
              <UpdateProfile user={user as User} />
            ) : (
              <div className="w-full">
                <FollowButton profileId={params.profileId as string} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-4">
        <div className="flex flex-col">
          <span className="font-bold text-lg">{user?.name}</span>
          <span className="text-muted-foreground text-sm">@{user?.username}</span>
        </div>
        <div className="flex gap-2 items-center text-sm text-muted-foreground">
          <FaRegCalendarAlt />
          <span>Joined {dayjs(user?.createdAt as Date).format("MMMM YYYY")}</span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <Link className="flex gap-1 hover:underline" href={"/"}>
            <span className="font-semibold">{user?.followingCount}</span>
            <span className="text-muted-foreground">Following</span>
          </Link>
          <Link className="flex gap-1 hover:underline" href={"/"}>
            <span className="font-semibold">{user?.followersCount}</span>
            <span className="text-muted-foreground">Followers</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
