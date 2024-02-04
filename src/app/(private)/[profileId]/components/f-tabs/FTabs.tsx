"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";

interface Props {}

export const FTabs: FC<Props> = () => {
  const pathname = usePathname();
  const params = useParams();
  return (
    <nav className="w-full flex h-12 border-b border-border">
      <Link
        replace
        className={cn(
          "h-full w-full flex justify-center items-center h:hover:bg-accent t:active:bg-accent text-muted-foreground transition-colors",
          {
            "text-foreground": pathname === "/" + params.profileId + "/followers",
          }
        )}
        href={"/" + params.profileId + "/followers"}
      >
        <div className="w-fit relative h-full flex justify-center items-center">
          Followers
          <div
            className={cn("w-full h-1.5 rounded-full bg-primary absolute left-0 bottom-0 hidden", {
              flex: pathname === "/" + params.profileId + "/followers",
            })}
          ></div>
        </div>
      </Link>
      <Link
        replace
        className={cn(
          "h-full w-full flex justify-center items-center h:hover:bg-accent t:active:bg-accent text-muted-foreground transition-colors",
          {
            "text-foreground": pathname === "/" + params.profileId + "/following",
          }
        )}
        href={"/" + params.profileId + "/following"}
      >
        <div className="w-fit relative h-full flex justify-center items-center">
          Following
          <div
            className={cn("w-full h-1.5 rounded-full bg-primary absolute left-0 bottom-0 hidden", {
              flex: pathname === "/" + params.profileId + "/following",
            })}
          ></div>
        </div>
      </Link>
    </nav>
  );
};
