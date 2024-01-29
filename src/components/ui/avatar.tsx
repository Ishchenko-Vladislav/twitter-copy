"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";
import { FaUser } from "react-icons/fa6";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const avatarStyles = cva(["rounded-full bg-gray-300"], {
  variants: {
    size: {
      default: ["w-10 h-10 "],
      large: ["w-36 h-36  border-4 border-background"],
    },
  },
  defaultVariants: {
    size: "default",
  },
});
type buttonType = VariantProps<typeof avatarStyles>;
const DefaultAvatar: React.FC<AvatarPrimitive.AvatarImageProps & buttonType> = ({
  size,
  ...props
}) => {
  return (
    <Avatar className={twMerge(avatarStyles({ size }))}>
      <AvatarImage {...props} />
      <AvatarFallback className="bg-inherit">
        <div className="w-full h-full bg-inherit flex justify-center items-center shrink-0">
          <FaUser className="text-gray-700 text-xl w-3/6 h-3/6" />
        </div>
      </AvatarFallback>
    </Avatar>
  );
};

export { Avatar, AvatarImage, AvatarFallback, DefaultAvatar };
