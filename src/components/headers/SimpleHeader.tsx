"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
interface Props {
  title: string;
  withArrow?: boolean;
  arrowCondition?: string;
  desc?: string | null;
  isLoading?: boolean;
}

export const SimpleHeader: FC<Props> = ({
  title,
  isLoading,
  withArrow = false,
  desc = null,
  arrowCondition = "",
}) => {
  const { back } = useRouter();
  return (
    <div className="w-full sticky top-0 h-12 bg-background/80 z-20 backdrop-blur-sm flex items-center gap-2 px-4">
      {withArrow ? (
        <button
          onClick={back}
          className={cn(
            "w-8 h-8 rounded-full flex justify-center items-center h:hover:bg-gray-300 t:active:bg-gray-300 transition-colors",
            arrowCondition
          )}
        >
          <IoArrowBackOutline />
        </button>
      ) : null}
      {isLoading ? (
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-52" />
        </div>
      ) : (
        <div className="flex flex-col">
          <h2 className="font-semibold text-base lg:text-lg  !leading-4 h-fit inline-block">
            {title}
          </h2>
          {desc ? <div className="text-sm text-muted-foreground !leading-4">{desc}</div> : null}
        </div>
      )}
    </div>
  );
};
