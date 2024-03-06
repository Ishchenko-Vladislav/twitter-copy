import { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
import { MediaQuery } from "../ui/media-query";
const Sidebar = dynamic(() => import("./desktop/sidebar/Sidebar"), {
  ssr: true,
});
const MobileNavigation = dynamic(() => import("./mobile/mobile-navigation/MobileNavigation"), {
  ssr: true,
});
const Navigation = dynamic(() => import("./desktop/navigation/Navigation"), {
  ssr: true,
});
interface Props {}

export const Layout: FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div className="max-w-[656px] lg:max-w-[976px] xl:max-w-[1144px] w-full mx-auto flex min-h-dvh overflow-hidden">
      <MediaQuery query="(min-width: 500px)">
        <Navigation />
      </MediaQuery>
      <main className="flex-1 flex flex-col lg:border-none border-r border-border">
        {children}
        <MediaQuery query="(max-width: 500px)">
          <MobileNavigation />
        </MediaQuery>
      </main>
      <MediaQuery query="(min-width: 1024px)">
        <Sidebar />
      </MediaQuery>
    </div>
  );
};
