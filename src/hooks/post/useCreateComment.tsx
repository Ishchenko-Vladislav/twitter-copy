import { useMemo, useState } from "react";
import { useUploadFile } from "../file/useUploadFile";
import { ICreatePostDTO } from "@/app/api/post/route";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useSWRInfinity from "swr/infinite";
import { mutate as mm } from "swr";

import { PostType } from "@/components/post/Post";
import { fetcher, getMessageFromError } from "@/lib/utils";
import { CommentResponse, ICreateCommentDTO } from "@/app/api/post/[postId]/comment/route";
import { useParams } from "next/navigation";
export const useCreateComment = () => {
  const [text, setText] = useState("");
  const params = useParams();
  const [isPendingComment, setIsPendingPost] = useState(false);
  const { data } = useSession();
  const { uploadFile, accept, attachments, isLoading, remove, clear } = useUploadFile({
    multiply: true,
    accept_default: "auto",
    max: 4,
  });
  const getKey = (pageIndex: number, previousPageData: any) => {
    const TAKE = 10;

    if (previousPageData && !previousPageData.length) return null;
    return `/api/post/${params.postId}/comment?take=${TAKE}&skip=${TAKE * pageIndex}`;
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

  const sendComment = async () => {
    try {
      setIsPendingPost(true);
      const dto: ICreateCommentDTO = {
        attachments: attachments.map((el) => ({
          publicId: el.public_id,
          type: el.resource_type as any,
          url: el.secure_url,
        })),
        text,
        userId: data?.user.id,
      };
      const res: CommentResponse = await fetch(`/api/post/${params.postId}/comment`, {
        method: "POST",
        body: JSON.stringify(dto),
      }).then((res) => res.json());
      console.log("COMMENT --", res);
      if (!res.success) {
        return toast.error(res.message);
      }
      const filteredData = d && [res.data, ...d];
      mutate(filteredData, { revalidate: false });
      mm(`/api/post/${params.postId}`);
      setText("");
      clear();
    } catch (error) {
      const message = getMessageFromError(error);
      toast.error(message);
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
    sendComment,
    isDisabledButton,
    isPendingComment,
  };
};
