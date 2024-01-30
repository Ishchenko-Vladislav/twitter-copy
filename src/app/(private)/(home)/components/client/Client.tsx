"use client";
import { FC } from "react";

interface Props {}
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePost } from "../create-post/CreatePost";
import { Posts } from "../posts/Posts";
import { FollowingPosts } from "../following-posts/FollowingPosts";

export const Client: FC<Props> = () => {
  return (
    <Tabs onValueChange={(value) => console.log(value)} defaultValue="For you" className="w-full">
      <TabsList className="z-20 w-full rounded-none sticky top-0 bg-background/60 backdrop-blur-sm  h-12 p-0 border-b border-border">
        <TabsTrigger
          className="group w-full data-[state='active']:!bg-transparent data-[state='active']:hover:!bg-accent/50 p-0 hover:!bg-accent/50 h-full rounded-none text-foreground font-semibold shadow-none data-[state='active']:!shadow-none"
          value="For you"
        >
          <div className="group-data-[state='active']:text-foreground text-muted-foreground relative w-fit h-full flex justify-center items-center">
            <span>For you</span>
            <div className="group-data-[state='active']:block hidden absolute bottom-0 left-0 w-full h-1.5 bg-primary rounded-full"></div>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="group w-full data-[state='active']:!bg-transparent data-[state='active']:hover:!bg-accent/50 p-0 hover:!bg-accent/50 h-full rounded-none text-foreground font-semibold shadow-none data-[state='active']:!shadow-none"
          value="Following"
        >
          <div className="group-data-[state='active']:text-foreground text-muted-foreground relative w-fit h-full flex justify-center items-center">
            <span>Following</span>
            <div className="group-data-[state='active']:block hidden absolute bottom-0 left-0 w-full h-1.5 bg-primary rounded-full"></div>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="For you" asChild>
        <div className="flex-1 h-fit">
          <CreatePost />
          <Posts />
        </div>
      </TabsContent>
      <TabsContent value="Following">
        <FollowingPosts />
      </TabsContent>
    </Tabs>
  );
};
