import { SimpleHeader } from "@/components/headers/SimpleHeader";
import React from "react";

interface Props {
  params: {
    conversationId: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="max-w-full lg:max-w-xl w-full lg:border-r">
      <SimpleHeader title="Vlad" arrowCondition="lg:hidden" withArrow />
      <div>page - {params.conversationId}</div>
    </div>
  );
};

export default page;
