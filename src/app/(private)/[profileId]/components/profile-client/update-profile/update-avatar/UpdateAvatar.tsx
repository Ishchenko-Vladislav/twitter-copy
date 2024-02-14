"use client";
import { DefaultAvatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadFile } from "@/hooks/file/useUploadFile";
// import { Input } from "postcss";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { ProfileDataDTO } from "../UpdateProfile";
import { Loader2 } from "lucide-react";
// import {} from '@'
interface Props {
  data: ProfileDataDTO;
  setData: Dispatch<SetStateAction<ProfileDataDTO>>;
}

export const UpdateAvatar: FC<Props> = ({ setData, data }) => {
  const { uploadFile, accept, attachments, isLoading, remove } = useUploadFile({
    multiply: false,
    accept_default: "image",
  });

  useEffect(() => {
    if (attachments.length > 0) {
      setData((prev) => ({
        ...prev,
        avatar: attachments[0]?.secure_url ?? null,
      }));
    }

    return () => {};
  }, [attachments]);
  const clean = () => {
    remove(attachments[0]?.public_id);
    setData((prev) => ({ ...prev, bg: null }));
  };
  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <div className="w-fit h-fit relative rounded-full overflow-hidden">
        {isLoading ? (
          <div className="w-full absolute inset-0 z-10 h-full bg-black/20 flex justify-center items-center">
            <Loader2 className="animate-spin text-2xl" />
          </div>
        ) : null}
        <DefaultAvatar src={data.avatar ?? ""} className="object-cover" size={"large"} />
      </div>
      <div className="flex items-center gap-5">
        <Input onChange={uploadFile} type="file" accept={accept} />
        <Button disabled={!data.avatar} onClick={clean} size={"icon"}>
          R
        </Button>
      </div>
    </div>
  );
};
