import { cn } from "@/lib/utils";
import { FC } from "react";

interface Props {
  currentCount?: number;
  maxCount?: number;
}

export const Progress: FC<Props> = ({ currentCount = 0, maxCount = 100 }) => {
  const clampedCurrentCount = Math.min(Math.max(currentCount, 0), maxCount);
  const percent = (clampedCurrentCount / maxCount) * 100;
  const degrees = (percent / 100) * 360;

  return (
    <div
      className={cn("w-6 p-1 aspect-square rounded-full border-border", {
        "opacity-0": currentCount === 0,
      })}
      style={{
        background: `conic-gradient(hsl(var(--primary)) 0deg, hsl(var(--primary)) ${degrees}deg, hsl(var(--secondary)) ${degrees}deg, hsl(var(--secondary)) 360deg)`,
      }}
    >
      <div className="w-full h-full rounded-full bg-background"></div>
    </div>
  );
};
