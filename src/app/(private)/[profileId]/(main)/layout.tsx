import { SimpleHeader } from "@/components/ui/SimpleHeader";
import { PropsWithChildren } from "react";
import { ProfileClient } from "../components/profile-client/ProfileClient";
import { TabsProfile } from "../components/tabs-profile/TabsProfile";

interface Props {}

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full">
      <SimpleHeader title="Profile" withArrow />
      <ProfileClient />
      <TabsProfile />
      {children}
    </div>
  );
};

export default layout;
