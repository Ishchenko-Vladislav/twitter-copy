"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";

interface Props {}

export const TabsProfile: FC<Props> = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <nav className="w-full flex h-12 border-b border-border mt-8">
      <Link
        replace
        className={cn("h-full px-5 flex hover:bg-accent text-muted-foreground transition-colors", {
          "text-foreground": pathname === "/" + params.profileId,
        })}
        href={"/" + params.profileId}
      >
        <div className="w-fit relative h-full flex justify-center items-center">
          Posts
          <div
            className={cn("w-full h-1.5 rounded-full bg-primary absolute left-0 bottom-0 hidden", {
              flex: pathname === "/" + params.profileId,
            })}
          ></div>
        </div>
      </Link>
      <Link
        replace
        className={cn("h-full px-5 flex hover:bg-accent text-muted-foreground transition-colors", {
          "text-foreground": pathname === "/" + params.profileId + "/likes",
        })}
        href={"/" + params.profileId + "/likes"}
      >
        <div className="w-fit relative h-full flex justify-center items-center">
          Likes
          <div
            className={cn("w-full h-1.5 rounded-full bg-primary absolute left-0 bottom-0 hidden", {
              flex: pathname === "/" + params.profileId + "/likes",
            })}
          ></div>
        </div>
      </Link>
    </nav>
  );
};
