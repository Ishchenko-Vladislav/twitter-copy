import { FC, PropsWithChildren } from "react";
import { FHeader } from "../components/f-header/FHeader";
import { FTabs } from "../components/f-tabs/FTabs";
interface Props {
  params: {
    profileId: string;
  };
}
const layout: FC<PropsWithChildren<Props>> = async ({ children, params }) => {
  return (
    <div>
      <FHeader profileId={params.profileId} />
      <FTabs />
      {children}
    </div>
  );
};

export default layout;
