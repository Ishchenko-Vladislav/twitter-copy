import { Bookmark, Home, LucideIcon, Mail } from "lucide-react";
import { PiHouseFill, PiHouse, PiHouseBold } from "react-icons/pi";
import { MdOutlineMailOutline, MdMail } from "react-icons/md";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IconType } from "react-icons";
import {
  IoMailOutline,
  IoMail,
  IoBookmarkOutline,
  IoBookmark,
  IoHomeOutline,
  IoHome,
  IoPerson,
  IoPersonOutline,
} from "react-icons/io5";

export interface TData {
  name: string;
  link: string;
  icon: IconType;
  icon_active: IconType;
}
export const desktop_data: TData[] = [
  {
    name: "Home",
    link: "/",
    icon: IoHomeOutline,
    icon_active: IoHome,
  },
  {
    name: "Messages",
    link: "/messages",
    icon: IoMailOutline,
    icon_active: IoMail,
  },
  {
    name: "Bookmarks",
    link: "/bookmarks",
    icon: IoBookmarkOutline,
    icon_active: IoBookmark,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: IoPersonOutline,
    icon_active: IoPerson,
  },
];
