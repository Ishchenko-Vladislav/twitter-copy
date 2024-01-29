import { DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FC, useRef, useState } from "react";
import { UpdateAvatar } from "../update-avatar/UpdateAvatar";
import { UpdateBg } from "../update-bg/UpdateBg";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { useSWRConfig } from "swr";
import { ProfileDataDTO } from "../UpdateProfile";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

interface Props {
  user: User;
}

export const UpdateContent: FC<Props> = ({ user }) => {
  const { mutate } = useSWRConfig();
  const { update: updateSession } = useSession();
  // const params = useParams();
  // const { user, isError, isLoading } = useUser(params.profileId as string);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [data, setData] = useState<ProfileDataDTO>({
    avatar: user.avatar,
    bg: user.bg,
    name: user.name,
    username: user?.username,
  });
  const update = async () => {
    const response = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      if (buttonRef && buttonRef.current) {
        buttonRef.current.click();
      }
      mutate(`/api/user/${user.id}`);
      updateSession({
        avatar: data.avatar,
        name: data.name,
        username: data.username,
      });
    }
    console.log("UPDATEd", response);
    // console.log(data);
  };
  return (
    <>
      <DialogHeader>
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
      </div>
    </>
  );
};
