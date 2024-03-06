"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FC, PropsWithChildren } from "react";

interface Props {
  query: string;
}

export const MediaQuery: FC<PropsWithChildren<Props>> = ({ children, query }) => {
  const is = useMediaQuery(query);
  if (!is) return null;
  return <>{children}</>;
};
