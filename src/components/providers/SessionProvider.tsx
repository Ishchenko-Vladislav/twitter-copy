"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React, { FC, PropsWithChildren } from "react";

interface Props {
  session: Session | null;
}

const ProviderSession: FC<PropsWithChildren<Props>> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default ProviderSession;
