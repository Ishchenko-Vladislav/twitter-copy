import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, FC, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type LottieOptions, useLottie } from "lottie-react";
import likeData from "@/lib/lottie/like.json";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  likesCount: number;
  isLiked: boolean;
}

export const Like: FC<Props> = ({ likesCount = 0, isLiked = false, className, ...attr }) => {
  const options: LottieOptions = {
    animationData: likeData,
    className: "w-10 h-10 shrink-0",
    autoplay: false,
    autoPlay: false,
    loop: false,
  };
  const { View, playSegments } = useLottie(options);
  useEffect(() => {
    if (isLiked) {
      playSegments([15, 59], true);
    } else {
      playSegments([0, 1], true);
    }
  }, [isLiked]);
  useEffect(() => {
    if (isLiked) {
      playSegments([59, 60], true);
    } else {
      playSegments([0, 1], true);
    }
  }, []);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            {...attr}
            onBlur={() => {}}
            className={cn(`flex items-center group w-fit like-button`, className)}
          >
            <div
              className="like-button transition-colors w-8 h-8 flex justify-center items-center rounded-full h:group-hover:text-pink-500 h:group-hover:bg-pink-500/20 t:group-active:text-pink-500 t:group-active:bg-pink-500/20"
              // className=" supports-[hover]:group-hover:text-pink-500 supports-[active]:group-active:text-pink-500 supports-[hover]:group-hover:bg-pink-500/20  supports-[active]:group-active:bg-pink-500/20 transition-colors w-8 h-8 flex justify-center items-center rounded-full"
            >
              {View}
            </div>
            <div>
              <span
                // className={cn("group-hover:text-pink-500 transition-colors", {
                //   "text-pink-500": isLiked,
                // })}
                className={`like-h-2 ${isLiked && "text-pink-500"}`}
              >
                {likesCount}
              </span>
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="text-xs bg-black/70 px-1 py-px rounded-none text-white"
        >
          {isLiked ? <p>Unlike</p> : <p>Like</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
