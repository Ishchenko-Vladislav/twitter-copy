"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import {
  RiHome2Line,
  RiHome2Fill,
  RiSearchFill,
  RiSearchLine,
  RiNotification2Fill,
  RiNotification2Line,
} from "react-icons/ri";
import { IoMailOutline, IoMail } from "react-icons/io5";
interface Props {}

const links = [
  {
    link: "/",
    icon: RiHome2Line,
    icon_active: RiHome2Fill,
  },
  {
    link: "/explore",
    icon: RiSearchLine,
    icon_active: RiSearchFill,
  },
  {
    link: "/notification",
    icon: RiNotification2Line,
    icon_active: RiNotification2Fill,
  },
  {
    link: "/messages",
    icon: IoMailOutline,
    icon_active: IoMail,
  },
];

export const MobileNavigation: FC<Props> = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 border border-t bg-background z-10 xs:hidden">
      <div className="w-full flex items-center justify-around h-full">
        {links.map((link, index) => {
          const isActive =
            link.link === "/"
              ? link.link === "/" && pathname === "/"
              : pathname.startsWith(link.link);
          return (
            <Link key={index} className="h-full flex justify-center items-center" href={link.link}>
              {isActive ? (
                <link.icon_active className="text-xl" />
              ) : (
                <link.icon className="text-xl" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
