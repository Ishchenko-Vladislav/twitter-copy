import { SimpleHeader } from "@/components/ui/SimpleHeader";
import { useUser } from "@/hooks/user/useUser";
import { NextPage } from "next";
import React from "react";
import { ProfileClient } from "./components/profile-client/ProfileClient";

interface Props {
  params: {
    profileId: string;
  };
}

const page: NextPage<Props> = async ({ params }) => {
  // const { user, isError, isLoading } = useUser(params.profileId);
  // console.log(user, isError, isError, "useUser -----");
  return (
    <div className="w-full">
      <SimpleHeader title="Profile" withArrow />
      <ProfileClient />
    </div>
  );
};

export default page;
