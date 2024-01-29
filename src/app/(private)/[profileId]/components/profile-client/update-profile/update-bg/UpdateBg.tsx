import { Button } from "@/components/ui/button";
// import { Input } from "postcss";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { ProfileDataDTO } from "../UpdateProfile";
import { useUploadFile } from "@/hooks/file/useUploadFile";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { LuLoader2 } from "react-icons/lu";
interface Props {
  data: ProfileDataDTO;

  setData: Dispatch<SetStateAction<ProfileDataDTO>>;
}

export const UpdateBg: FC<Props> = ({ setData, data }) => {
  const { uploadFile, accept, attachments, isLoading, remove } = useUploadFile({
    multiply: false,
    accept_default: "image",
  });

  useEffect(() => {
    if (attachments.length > 0) {
      setData((prev) => ({
        ...prev,
        bg: attachments[0]?.secure_url ?? null,
      }));
    }

    return () => {};
  }, [attachments]);
  const clean = () => {
    remove(attachments[0]?.public_id);
    setData((prev) => ({ ...prev, bg: null }));
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="min-h-32 border border-border bg-secondary">
        {isLoading ? (
          <div className="w-full h-full bg-black/20 flex justify-center items-center">
            <LuLoader2 className="animate-spin text-2xl" />
          </div>
        ) : null}
        {!!data.bg ? (
          <div className="w-full h-full relative">
            <Image className="object-cover" alt="" src={data.bg ?? ""} fill />
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-5">
        <Input onChange={uploadFile} type="file" accept={accept} />
        {/* <Input /> */}
        <Button disabled={!data.bg} onClick={clean} size={"icon"}>
          R
        </Button>
      </div>
    </div>
  );
};
