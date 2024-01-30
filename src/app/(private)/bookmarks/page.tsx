import { SimpleHeader } from "@/components/ui/SimpleHeader";
import React from "react";
import { Client } from "./components/client/client";

interface Props {}

const page = (props: Props) => {
  return (
    <div>
      <SimpleHeader title="Bookmarks" />
      <Client />
    </div>
  );
};

export default page;
