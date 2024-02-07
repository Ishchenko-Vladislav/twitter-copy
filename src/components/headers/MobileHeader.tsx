"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { DefaultAvatar } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import { useUser } from "@/hooks/user/useUser";
import { IoBookmarkOutline, IoPersonOutline, IoExitOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
interface Props {
  withBg?: boolean;
  title: string;
}

const links = [
  {
    link: "/profile",
    icon: IoPersonOutline,
    title: "Profile",
  },
  {
    link: "/bookmarks",
    icon: IoBookmarkOutline,
    title: "Bookmarks",
  },
  // {
  //   link: '/profile',
  //   icon: IoPersonOutline,
  //   title: 'Profile'
  // },
];

export const MobileHeader: FC<Props> = ({ withBg = true, title }) => {
  const { data } = useSession();
  const { user } = useUser(data?.user.id ?? "");
  const { push } = useRouter();
  const logout = async () => {
    await signOut({
      redirect: false,
    });
    push("/login");
  };
  return (
    <div
      className={cn("w-full h-12", {
        "bg-background/60 backdrop-blur-sm": withBg,
      })}
    >
      <div className="w-full flex items-center gap-4 px-4 h-full">
        <Sheet>
          <SheetTrigger className="">
            <DefaultAvatar src={data?.user?.avatar ?? ""} />
          </SheetTrigger>

          <SheetContent className="px-0" side={"left"}>
            <SheetHeader>
              {/* <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription> */}
            </SheetHeader>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col px-4">
                <SheetClose asChild>
                  <Link href={"/" + data?.user?.id}>
                    <DefaultAvatar src={data?.user?.avatar ?? ""} />
                  </Link>
                </SheetClose>
                <div className="text-foreground font-bold">{data?.user?.name}</div>
                <div className="h-fit !leading-4 text-muted-foreground">{data?.user?.username}</div>
              </div>
              <div className="flex gap-4 items-center text-sm px-4">
                <SheetClose asChild>
                  <Link
                    className="flex gap-1 hover:border-black border-transparent border-b transition-colors !leading-4"
                    href={"/" + data?.user?.id + "/following"}
                  >
                    <span className="font-semibold">{user?._count?.followers}</span>
                    <span className="text-muted-foreground">Following</span>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    className="flex gap-1 hover:border-black border-transparent border-b transition-colors !leading-4"
                    href={"/" + data?.user?.id + "/followers"}
                  >
                    <span className="font-semibold">{user?._count?.following}</span>
                    <span className="text-muted-foreground">Followers</span>
                  </Link>
                </SheetClose>
              </div>
              <div>
                {links.map((el) => (
                  <SheetClose key={el.title} asChild>
                    <Link
                      className="flex items-center gap-2 text-lg w-full h-12 px-4 active:bg-accent"
                      href={el.link}
                    >
                      <el.icon />
                      <span className="font-semibold">{el.title}</span>
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <div
                    onClick={logout}
                    className="flex items-center gap-2 text-lg w-full h-12 px-4 active:bg-accent"
                  >
                    <IoExitOutline />
                    <span className="font-semibold">Log out</span>
                  </div>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="w-fit">
          <span className="text-foreground font-bold">{title}</span>
        </div>
      </div>
    </div>
  );
};
