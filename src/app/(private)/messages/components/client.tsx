"use client";
import { socket } from "@/lib/socket";
import { FC, useEffect } from "react";

interface Props {}

export const Client: FC<Props> = () => {
  //   useEffect(() => {
  //     socket.on("d", (e: any) => {
  //       console.log(e);
  //     });
  //   }, []);
  return <div>client</div>;
};
