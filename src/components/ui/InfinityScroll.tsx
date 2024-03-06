"use client";
import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useEffect, useRef } from "react";
import { Loader } from "./loader";

interface Props extends HTMLAttributes<HTMLDivElement> {
  inverse?: boolean;
  next?: () => void;
  endMessage?: string | ReactNode;
  isReached?: boolean;
  isLoading?: boolean;
}

export const InfinityScroll: FC<PropsWithChildren<Props>> = ({
  className,
  children,
  endMessage = "",
  inverse = false,
  isReached = false,
  isLoading = false,
  next,
  ...attr
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollHandle = () => {
    if (containerRef && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      //   console.log(scrollTop - clientHeight, scrollHeight);
      // console.log(scrollHeight - clientHeight + scrollTop);
      // console.log(clientHeight - scrollHeight);
      if (inverse) {
        if (clientHeight - scrollHeight === scrollTop) {
          // console.log("start");
          if (next) return next();
        }
      } else {
        if (scrollTop + clientHeight === scrollHeight) {
          // console.log("end");
          if (next) return next();
        }
      }
    }
  };

  return (
    <div
      onScroll={scrollHandle}
      ref={containerRef}
      className={cn("h-full overflow-y-auto", className)}
      {...attr}
    >
      {children}
      {isReached ? <div className="flex-1">{endMessage}</div> : null}
      {isLoading ? <Loader /> : null}
    </div>
  );
};
