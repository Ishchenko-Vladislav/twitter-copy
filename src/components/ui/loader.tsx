// import { Loader2 } from 'lucide-react';
import { Loader2 } from "lucide-react";
import { FC } from "react";

interface Props {}

export const Loader: FC<Props> = () => {
  return (
    <div className="w-full justify-center h-12 items-center flex">
      <Loader2 className="animate-spin w-fit" />
    </div>
  );
};
