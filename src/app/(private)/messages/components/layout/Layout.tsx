import { FC, PropsWithChildren } from "react";
import { Conversations } from "./conversations/Conversations";

interface Props {}

export const Layout: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="flex flex-row h-full w-full">
      <div className="lg:block hidden max-w-xs w-full">
        <Conversations />
      </div>
      {children}
    </div>
  );
};
