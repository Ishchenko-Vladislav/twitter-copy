"use client";
import { FC, useEffect } from "react";

interface Props {}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { CreatePost } from "../create-post/CreatePost";
import { Posts } from "../posts/Posts";
import { FollowingPosts } from "../following-posts/FollowingPosts";
import { MobileHeader } from "@/components/headers/MobileHeader";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useScrollDirection from "@/hooks/useScrollDirection";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const CreatePost = dynamic(() => import("../create-post/CreatePost"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
export const Client: FC<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 500px)");
  const { isScrollingDown, isScrollingUp } = useScrollDirection();
  return (
    <Tabs defaultValue="For you" className="w-full">
      <TabsList
        className={cn(
          "z-20 w-full rounded-none sticky transition-transform duration-500 flex-col top-0 bg-background/80 backdrop-blur-sm h-fit p-0 border-b border-border",
          {
            "-translate-y-full": isScrollingDown && isMobile,
            "-translate-y-0": isScrollingUp && isMobile,
          }
        )}
      >
        {isMobile ? <MobileHeader title="Twitter - clone" withBg={false} /> : null}

        <div className="h-12 flex w-full">
          <TabsTrigger
            className="group w-full data-[state='active']:!bg-transparent data-[state='active']:h:hover:!bg-accent/50 p-0 data-[state='active']:t:active:!bg-accent/50 t:active:!bg-accent/50 h:hover:!bg-accent/50 h-full rounded-none text-foreground font-semibold shadow-none data-[state='active']:!shadow-none"
            value="For you"
          >
            <div className="group-data-[state='active']:text-foreground text-muted-foreground relative w-fit h-full flex justify-center items-center">
              <span>For you</span>
              <div className="group-data-[state='active']:block hidden absolute bottom-0 left-0 w-full h-1.5 bg-primary rounded-full"></div>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="group w-full data-[state='active']:!bg-transparent data-[state='active']:h:hover:!bg-accent/50 p-0 data-[state='active']:t:active:!bg-accent/50 t:active:!bg-accent/50 h:hover:!bg-accent/50 h-full rounded-none text-foreground font-semibold shadow-none data-[state='active']:!shadow-none"
            value="Following"
          >
            <div className="group-data-[state='active']:text-foreground text-muted-foreground relative w-fit h-full flex justify-center items-center">
              <span>Following</span>
              <div className="group-data-[state='active']:block hidden absolute bottom-0 left-0 w-full h-1.5 bg-primary rounded-full"></div>
            </div>
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="For you" asChild>
        <div className="flex-1 h-fit">
          {!isMobile ? <CreatePost /> : null}
          <Posts />
        </div>
      </TabsContent>
      <TabsContent value="Following">
        <FollowingPosts />
      </TabsContent>
    </Tabs>
  );
};
