import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  bookmarksCount: number;
  isMarked: boolean;
}

export const Bookmark: FC<Props> = ({
  bookmarksCount = 0,
  isMarked = false,
  className,
  ...attr
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            {...attr}
            className={cn("flex items-center group w-fit disabled:opacity-50", className)}
          >
            <div className="group-hover:text-blue-500 transition-colors w-8 h-8 flex justify-center items-center rounded-full group-hover:bg-blue-500/20">
              {isMarked ? <FaBookmark className="text-blue-500" /> : <FaRegBookmark />}
            </div>
            <div>
              <span
                className={cn("group-hover:text-blue-500 transition-colors", {
                  "text-blue-500": isMarked,
                })}
              >
                {bookmarksCount}
              </span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          // align="start"
          side="bottom"
          className="text-xs bg-black/70 px-1 py-px rounded-none text-white"
        >
          {isMarked ? <p>Remove from Bookmarks</p> : <p>Bookmark</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
