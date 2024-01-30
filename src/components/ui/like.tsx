import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  likesCount: number;
  isLiked: boolean;
}

export const Like: FC<Props> = ({ likesCount = 0, isLiked = false, className, ...attr }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            {...attr}
            className={cn("flex items-center group w-fit disabled:opacity-50", className)}
          >
            <div className="group-hover:text-pink-500  transition-colors w-8 h-8 flex justify-center items-center rounded-full group-hover:bg-pink-500/20">
              {isLiked ? <FaHeart className="text-pink-500" /> : <FaRegHeart />}
            </div>
            <div>
              <span
                className={cn("group-hover:text-pink-500 transition-colors", {
                  "text-pink-500": isLiked,
                })}
              >
                {likesCount}
              </span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          // align="start"
          side="bottom"
          className="text-xs bg-black/70 px-1 py-px rounded-none text-white"
        >
          {isLiked ? <p>Unlike</p> : <p>Like</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
