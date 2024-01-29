import { FC, PropsWithChildren } from "react";
import { Sidebar } from "./desktop/sidebar/Sidebar";
import { Navigation } from "./desktop/navigation/Navigation";

interface Props {}

export const Layout: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="max-w-[656px] lg:max-w-[976px] xl:max-w-[1144px] w-full mx-auto flex min-h-dvh">
      <Navigation />
      <main className="flex-1 flex flex-col">{children}</main>
      <Sidebar />
    </div>
  );
};
