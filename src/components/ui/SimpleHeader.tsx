"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
interface Props {
  title: string;
  withArrow?: boolean;
}

export const SimpleHeader: FC<Props> = ({ title, withArrow = false }) => {
  const { back } = useRouter();
  return (
    <div className="w-full sticky top-0 h-12 bg-background/80 backdrop-blur-sm flex items-center gap-2 px-4">
      {withArrow ? (
        <button
          onClick={back}
          className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-300 transition-colors"
        >
          <IoArrowBackOutline />
        </button>
      ) : null}
      <div className="font-semibold text-base lg:text-lg">{title}</div>
    </div>
  );
};
