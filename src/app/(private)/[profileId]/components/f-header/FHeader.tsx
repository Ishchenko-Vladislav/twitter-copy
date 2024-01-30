"use client";
import { SimpleHeader } from "@/components/ui/SimpleHeader";
import { useUser } from "@/hooks/user/useUser";
import { FC } from "react";

interface Props {
  profileId: string;
}

export const FHeader: FC<Props> = ({ profileId }) => {
  const { user, isLoading } = useUser(profileId);

  return (
    <SimpleHeader
      isLoading={isLoading}
      withArrow
      title={user?.name ?? ""}
      desc={"@" + user?.username}
    />
  );
};
