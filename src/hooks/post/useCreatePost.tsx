import { useMemo, useState } from "react";
import { useUploadFile } from "../file/useUploadFile";
import { ICreatePostDTO } from "@/app/api/post/route";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useSWRInfinity from "swr/infinite";

import { PostType } from "@/components/post/Post";
import { fetcher } from "@/lib/utils";
export const useCreatePost = () => {
  const [text, setText] = useState("");
  const [isPendingPost, setIsPendingPost] = useState(false);
  const { data } = useSession();
  const { uploadFile, accept, attachments, isLoading, remove, clear } = useUploadFile({
    multiply: true,
    accept_default: "auto",
    max: 4,
  });
  const getKey = (pageIndex: number, previousPageData: any) => {
    const TAKE = 10;

    if (previousPageData && !previousPageData.length) return null;
    return `/api/post?take=${TAKE}&skip=${TAKE * pageIndex}`;
  };
  const { data: d, mutate } = useSWRInfinity(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
    revalidateOnMount: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
  const isDisabledButton: boolean = useMemo(() => {
    if (text.length === 0 && attachments.length === 0) return true;
    else return false;
  }, [text, attachments]);

  const sendPost = async () => {
    try {
      setIsPendingPost(true);
      const dto: ICreatePostDTO = {
        attachments: attachments.map((el) => ({
          publicId: el.public_id,
          type: el.resource_type as any,
          url: el.secure_url,
        })),
        text,
        userId: data?.user.id,
      };
      const res: PostType = await fetch("/api/post", {
        method: "POST",
        body: JSON.stringify(dto),
      }).then((res) => res.json());

      const filteredData = d && res.id ? [res, ...d?.map((el) => el)] : d;
      mutate(filteredData, { revalidate: false });
      setText("");
      clear();
      return res;
    } catch (error) {
      toast.error("something went wrong");
    } finally {
      setIsPendingPost(false);
    }
  };
  return {
    text,
    setText,
    accept,
    attachments,
    isLoading,
    uploadFile,
    remove,
    sendPost,
    isDisabledButton,
    isPendingPost,
  };
};
