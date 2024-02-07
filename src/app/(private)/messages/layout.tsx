import React, { FC, PropsWithChildren } from "react";
import { Layout } from "./components/layout/Layout";

interface Props {}

const layout: FC<PropsWithChildren> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default layout;
