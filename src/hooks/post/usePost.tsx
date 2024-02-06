import { TPost } from "@/app/api/post/[postId]/route";
import { Response } from "@/lib/interface";
import { fetcher } from "@/lib/utils";
import toast from "react-hot-toast";
import useSWR from "swr";

export const usePost = (postId: string) => {
  return useSWR<Response<TPost>>(`/api/post/${postId}`, fetcher, {
    // onError(err, key, config) {
    //   toast.error(err);
    // },
  });
};
