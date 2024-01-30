import { cn } from "@/lib/utils";
import { FC, HTMLAttributes, MouseEvent } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TbMessageCircle2 } from "react-icons/tb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  commentsCount: number;
}

export const Comment: FC<Props> = ({ commentsCount = 0, className, ...attr }) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <button {...attr} className={cn("flex items-center group w-fit", className)}>
                <div className="group-hover:text-blue-500 transition-colors w-8 h-8 flex justify-center items-center rounded-full group-hover:bg-blue-500/20">
                  <TbMessageCircle2 />
                </div>
                <div>
                  <span className="group-hover:text-blue-500 transition-colors">
                    {commentsCount}
                  </span>
                </div>
              </button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent
            // align="start"
            side="bottom"
            className="text-xs bg-black/70 px-1 py-px rounded-none text-white pointer-events-none select-none"
          >
            <p>Reply</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
