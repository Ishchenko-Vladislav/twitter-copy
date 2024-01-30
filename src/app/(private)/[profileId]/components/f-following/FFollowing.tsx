import { DefaultAvatar } from "@/components/ui/avatar";
import { User } from "@/components/user/User";
import Link from "next/link";
import { FC } from "react";
import { FollowingType } from "../../(f)/following/page";

type Props = {
  recipient: {
    name: string | null;
    id: string;
    username: string;
    avatar: string | null;
  };
} & {
  id: number;
  userId: string;
  recipientId: string;
};

export const FFollowing: FC<FollowingType> = ({ recipient: user, id }) => {
  return <User user={user} />;
};
