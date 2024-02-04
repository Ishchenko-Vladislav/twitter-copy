import { NextPage } from "next";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { FaXTwitter } from "react-icons/fa6";
interface Props {}

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full min-h-dvh flex flex-col justify-center items-center">
      <div className="w-full h-full flex flex-1 gap-5">
        {/* <div className="w-full flex-1 max-w-[45dvw]">
          <div className="w-full h-full p-3">
            <div className="w-full h-full rounded-2xl bg-foreground flex flex-col p-5 text-background">
              <div className="flex gap-3 text-2xl items-center">
                <FaXTwitter />
                <h1 className="font-bold">Twitter copy</h1>
              </div>
              <div className="mt-auto">
                Created by{" "}
                <Link
                  href={"https://www.linkedin.com/in/vladislav-ishchenko-ba1825255/"}
                  target="_blank"
                  className="underline"
                >
                  Ishchenko Vladislav
                </Link>
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex-1 bg-background">{children}</div>
      </div>
    </div>
  );
};

export default layout;
