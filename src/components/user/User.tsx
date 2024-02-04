import Link from "next/link";
import { Dispatch, FC, PropsWithChildren, SetStateAction, useState } from "react";
import { DefaultAvatar } from "../ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { FollowButton } from "../ui/FollowButton";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface Props {
  withInvalidate?: boolean;
  invalidateKey?: string;
  user: {
    id: string;
    avatar: string | null;
    name: string | null;
    username: string;
    _count: {
      following: number;
      followers: number;
    };
  };
}

export const User: FC<Props> = ({ user: { _count, ...user }, invalidateKey, withInvalidate }) => {
  const [count, setCount] = useState({ ..._count });
  const { push } = useRouter();
  const onClick = () => {
    push("/" + user.id);
  };
  const onSuccessFollow = (isFollow: boolean) => {
    if (isFollow) {
      setCount((prev) => ({
        ...prev,
        following: prev.following + 1,
      }));
    } else {
      setCount((prev) => ({
        ...prev,
        following: prev.following - 1,
      }));
    }
  };
  return (
    <div
      onClick={onClick}
      className="w-full py-2 px-3 gap-3 hover:bg-accent transition-colors flex items-center"
    >
      <HoverCardUserInfo
        asChild
        onSuccessFollow={onSuccessFollow}
        user={{ ...user, _count: count }}
      >
        <button>
          <DefaultAvatar src={user.avatar ?? ""} />
        </button>
      </HoverCardUserInfo>

      <div className="flex flex-col overflow-hidden text-sm items-start">
        <HoverCardUserInfo
          asChild
          onSuccessFollow={onSuccessFollow}
          user={{ ...user, _count: count }}
        >
          <div className="font-semibold w-full overflow-hidden text-ellipsis">
            <span className="truncate">{user.name}</span>
          </div>
        </HoverCardUserInfo>
        <HoverCardUserInfo
          asChild
          onSuccessFollow={onSuccessFollow}
          user={{ ...user, _count: count }}
        >
          <div className="truncate text-muted-foreground w-full overflow-hidden text-ellipsis">
            <span className="truncate">@{user.username}</span>
          </div>
        </HoverCardUserInfo>
      </div>

      <div onClick={(e) => e.stopPropagation()} className="ml-auto">
        <FollowButton
          invalidateKey={invalidateKey}
          withInvalidate={withInvalidate}
          onSuccess={onSuccessFollow}
          profileId={user.id}
        />
      </div>
    </div>
  );
};
interface IHoverCardUserInfo {
  withInvalidate?: boolean;
  invalidateKey?: string;
  user: {
    id: string;
    avatar: string | null;
    name: string | null;
    username: string;
    _count: {
      following: number;
      followers: number;
    };
  } | null;
  onSuccessFollow?: (i: boolean) => void;
  asChild?: boolean;
}
export const HoverCardUserInfo: FC<PropsWithChildren<IHoverCardUserInfo>> = ({
  children,
  user,
  invalidateKey,
  withInvalidate,
  onSuccessFollow,
  asChild = false,
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer relative" asChild={asChild}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 z-50 bg-background"
      >
        {user ? (
          <>
            <div className="w-full flex items-start justify-between">
              <Link href={"/" + user.id}>
                <DefaultAvatar size={"md"} src={user.avatar ?? ""} />
              </Link>
              <FollowButton
                invalidateKey={invalidateKey}
                withInvalidate={withInvalidate}
                onSuccess={onSuccessFollow}
                profileId={user.id}
              />
            </div>
            <div className="flex flex-col">
              <Link href={"/" + user?.id} className="text-foreground !leading-4 font-semibold">
                {user?.name}
              </Link>
              <Link href={"/" + user?.id} className="text-muted-foreground !leading-4">
                @{user?.username}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={"/" + user.id + "/followers"}
                className="hover:border-foreground border-transparent border-b flex gap-2 text-sm"
              >
                <span>{user?._count?.following}</span>
                <span className="text-muted-foreground">Followers</span>
              </Link>
              <Link
                href={"/" + user?.id + "/followings"}
                className="hover:border-foreground border-transparent border-b flex gap-2 text-sm"
              >
                <span>{user?._count?.followers}</span>
                <span className="text-muted-foreground">Followings</span>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <span>User does not exist</span>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
};
