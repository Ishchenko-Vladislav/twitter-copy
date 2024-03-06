import { FC } from "react";
import { Client } from "./Client";
import { UserButton } from "./UserButton";
interface Props {}

const Navigation: FC<Props> = () => {
  return (
    <div className="max-w-14 xl:max-w-56 w-full border-r border-border flex-1 xl:p-2 min-h-dvh h-fit flex flex-col sticky top-0">
      <div className="w-full flex-1 flex flex-col gap-2 xl:items-start items-center ">
        <Client />
        <UserButton />
      </div>
    </div>
  );
};
export default Navigation;
