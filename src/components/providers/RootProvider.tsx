import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { type Session } from "next-auth";
import ProviderSession from "./SessionProvider";
import { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
interface Props {
  session: Session | null;
}

export const RootProvider: FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return (
    <ProviderSession session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        {children}
        <Toaster />
      </ThemeProvider>
    </ProviderSession>
  );
};
