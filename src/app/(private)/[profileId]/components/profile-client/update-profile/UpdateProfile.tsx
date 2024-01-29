"use client";
import { FC, useRef, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUploadFile } from "@/hooks/file/useUploadFile";
import { Input } from "@/components/ui/input";
import { UpdateAvatar } from "./update-avatar/UpdateAvatar";
import { useParams } from "next/navigation";
import { useUser } from "@/hooks/user/useUser";
import { User } from "@prisma/client";
import { UpdateBg } from "./update-bg/UpdateBg";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSWRConfig } from "swr";
import { UpdateContent } from "./update-content/UpdateContent";
interface Props {
  user: User;
}

export interface ProfileDataDTO {
  name: string | null;
  username: string;
  avatar: string | null;
  bg: string | null;
}
export const UpdateProfile: FC<Props> = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="rounded-full font-semibold">
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-full">
        <UpdateContent user={user} />
        {/* <DialogHeader>
          <DialogTitle>Update your profile</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col gap-4">
          <UpdateAvatar data={data} setData={setData} />
          <UpdateBg data={data} setData={setData} />
          <div className="flex flex-col gap-2">
            <label htmlFor="Name">Name</label>
            <Input
              id="Name"
              value={data.name ?? ""}
              onChange={(e) => setData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="Username">Username</label>
            <Input
              id="Username"
              value={data.username ?? ""}
              onChange={(e) => setData((prev) => ({ ...prev, username: e.target.value }))}
              placeholder="Username"
              type="text"
            />
          </div>
          <Button onClick={update}>Update</Button>
          <DialogClose ref={buttonRef} />
        </div> */}
      </DialogContent>
    </Dialog>
  );
};
