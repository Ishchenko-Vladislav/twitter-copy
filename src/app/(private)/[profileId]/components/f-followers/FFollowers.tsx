import { DefaultAvatar } from "@/components/ui/avatar";
import { User } from "@/components/user/User";
import Link from "next/link";
import { FC } from "react";
import { FollowersType } from "../../(f)/followers/page";

export const FFollowers: FC<FollowersType> = ({ user: user, id }) => {
  return <User user={user} />;
};
