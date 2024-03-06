"use client";
import { FC } from "react";
import { desktop_data } from "./data/desktop-data";
// import { LinkItem } from "./LinkItem";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {}

export const Client: FC<Props> = () => {
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <nav>
      {desktop_data.map((el) => {
        return (
          <Link className="w-full group block" key={el.name} href={el.link}>
            <div className="w-fit pl-2.5 pr-2.5 xl:pr-5 py-2.5 rounded-full group-hover:bg-accent transition-colors flex gap-1 items-center">
              {el.link === "/" ? (
                pathname === "/" ? (
                  <div className="flex items-center gap-2">
                    <el.icon_active size={20} />
                    <span className="xl:inline hidden font-semibold">{el.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <el.icon size={20} />
                    <span className="xl:inline hidden">{el.name}</span>
                  </div>
                )
              ) : el.link === "/profile" ? (
                !!data && !!data.user ? (
                  pathname === "/" + data.user.id ? (
                    <div className="flex items-center gap-2">
                      <el.icon_active size={20} />
                      <span className="xl:inline hidden font-semibold">{el.name}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <el.icon size={20} />
                      <span className="xl:inline hidden">{el.name}</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-2">
                    <el.icon size={20} />
                    <span className="xl:inline hidden">{el.name}</span>
                  </div>
                )
              ) : pathname.startsWith(el.link) ? (
                <div className="flex items-center gap-2">
                  <el.icon_active size={20} />
                  <span className="xl:inline hidden font-semibold">{el.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <el.icon size={20} />
                  <span className="xl:inline hidden">{el.name}</span>
                </div>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
