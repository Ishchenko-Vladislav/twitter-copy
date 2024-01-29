// import { Loader2 } from 'lucide-react';
import { FC } from "react";
import { LuLoader2 } from "react-icons/lu";

interface Props {}

export const Loader: FC<Props> = () => {
  return (
    <div className="w-full justify-center h-12 items-center flex">
      <LuLoader2 className="animate-spin w-fit" />
    </div>
  );
};
