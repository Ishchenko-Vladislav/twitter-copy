"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import React from "react";
// import { Conversations } from "./components/layout/conversations/Conversations";
import { Button } from "@/components/ui/button";
import { Conversations } from "./components/layout/conversations/Conversations";

interface Props {}

const page = (props: Props) => {
  const isLessThen1024 = useMediaQuery("(max-width: 1024px)");
  return (
    <div className="w-full border-r">
      <div className="w-full h-full hidden lg:flex justify-center flex-col gap-2 max-w-xs mx-auto ">
        <span className="font-bold text-2xl">Select a message</span>
        <span className="text-base text-muted-foreground">
          Choose from your existing conversations, start a new one, or just keep swimming.
        </span>
        <Button>new message</Button>
      </div>
    </div>
  );
  // return (
  //   <div className="border-r lg:max-w-xl w-full">
  //     {isLessThen1024 ? (
  //       <Conversations />
  //     ) : (
  //       <div className="w-full h-full flex justify-center  flex-col gap-2 max-w-xs mx-auto">
  //         <span className="font-bold text-2xl">Select a message</span>
  //         <span className="text-base text-muted-foreground">
  //           Choose from your existing conversations, start a new one, or just keep swimming.
  //         </span>
  //         <Button>new message</Button>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default page;
