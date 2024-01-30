import { User } from "@/components/user/User";
import { useUsers } from "@/hooks/user/useUsers";
import { FC } from "react";

interface Props {}

export const MightKnow: FC<Props> = () => {
  const { data: users, isLoading, isError } = useUsers();
  if (isLoading || isError || users?.length === 0) return null;
  return (
    <div className="w-full rounded-xl py-3 bg-secondary/50 flex flex-col gap-4">
      <div className="font-bold px-3">You might know</div>
      <div>
        {!isError &&
          !!users &&
          users.map((user) => <User invalidateKey="/api/user" withInvalidate user={user} />)}
      </div>
    </div>
  );
};
