"use client";
import { cn } from "@/lib/utils";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

interface Props {
  isScale: boolean;
}

export const Scale: FC<PropsWithChildren<Props>> = ({ children, isScale }) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref && ref.current) {
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  }, []);
  return (
    <div
      ref={ref}
      className={cn("transition-all", {
        ["h-0"]: isScale,
        // ['']: isScale && mounted
      })}
    >
      {children}
    </div>
  );
};
