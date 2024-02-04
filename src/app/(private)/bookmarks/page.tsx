import { SimpleHeader } from "@/components/headers/SimpleHeader";
import React from "react";
import { Client } from "./components/client/client";

interface Props {}

const page = (props: Props) => {
  return (
    <div>
      <SimpleHeader withArrow arrowCondition="xs:hidden" title="Bookmarks" />
      <Client />
    </div>
  );
};

export default page;
