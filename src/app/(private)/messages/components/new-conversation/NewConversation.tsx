import { FC, PropsWithChildren, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoSearch } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { Recipients } from "./recipients/Recipients";
interface Props {
  asChild: boolean;
}

export const NewConversation: FC<PropsWithChildren<Props>> = ({ asChild, children }) => {
  const [searchTerms, setSearchTerms] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="px-0  overflow-y-auto max-h-[100dvh]">
        {/* {variables.length > 0 ? (
          <div className="absolute inset-0 flex justify-center items-center bg-black/20">
            <div className="py-5 flex justify-center items-center gap-2 text-2xl">
              <ImSpinner6 className="animate-spin" />
              <span>Loading</span>
            </div>
          </div>
        ) : null} */}
        <DialogHeader className="px-4">
          <DialogTitle className="text-2xl font-semibold">New message</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <div className="px-4 h-fit">
          <div className="w-full items-center flex gap-3">
            <IoSearch className="text-xl" />
            <input
              onChange={({ target }) => setSearchTerms(target.value)}
              value={searchTerms}
              className=" bg-transparent outline-none"
              placeholder="Search people"
              type="text"
            />
          </div>
        </div>
        <button className="w-full py-3 border-y flex text-foreground gap-4 items-center border-border px-4 hover:bg-accent transition-colors">
          <div className="w-12 h-12 rounded-full border border-border flex justify-center items-center">
            <MdGroups className="text-2xl" />
          </div>
          <span className="text-xl">Create group</span>
        </button>
        <Recipients searchTerms={searchTerms} />
      </DialogContent>
    </Dialog>
  );
};
