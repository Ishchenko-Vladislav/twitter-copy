"use client";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { FaUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { LuPaintbrush } from "react-icons/lu";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DefaultAvatar } from "@/components/ui/avatar";
interface Props {}

export const UserButton: FC<Props> = () => {
  const { data } = useSession();
  const { push } = useRouter();
  const logout = async () => {
    await signOut({
      redirect: false,
    });
    push("/login");
  };
  return (
    <div className="w-full mt-auto flex justify-center">
      <Dialog>
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-fit xl:w-full p-2 hover:bg-accent transition-all flex gap-2 rounded-full overflow-hidden">
              {/* <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-gray-300 flex justify-center items-center shrink-0">
                <FaUser className="text-gray-700 text-xl" />
              </div> */}
              <DefaultAvatar src={data?.user.avatar ?? ""} />
              <div className="hidden xl:flex flex-col overflow-hidden text-sm items-start">
                <div className="truncate font-semibold">
                  <span>{data?.user.name}</span>
                </div>
                <div className="truncate text-muted-foreground">
                  <span>@{data?.user.username}</span>
                </div>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="px-0 py-3 flex flex-col rounded-xl">
            <DialogTrigger asChild>
              <button
                className="p-2 hover:bg-accent transition-all items-center flex flex-wrap gap-1 text-sm font-semibold"
                // onClick={() => signOut()}
              >
                <LuPaintbrush />
                <span className="">Customize</span>
              </button>
            </DialogTrigger>
            <PopoverClose asChild>
              <button
                className="p-2 hover:bg-accent transition-all items-center flex flex-wrap gap-1 text-sm font-semibold"
                onClick={logout}
              >
                <span>Log out</span>
                <span className="">@{data?.user.username}</span>
              </button>
            </PopoverClose>
            {/* <PopoverTrigger asChild>
              <button
                className="p-2 hover:bg-accent transition-all items-center flex flex-wrap gap-1 text-sm font-semibold"
                onClick={logout}
              >
                <span>Log out</span>
                <span className="">@{data?.user.username}</span>
              </button>
            </PopoverTrigger> */}
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
