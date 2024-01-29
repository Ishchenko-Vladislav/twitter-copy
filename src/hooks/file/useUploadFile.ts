// // import { ChangeEvent, useState } from "react";
// // import toast from "react-hot-toast";
// // // import type {CldImageProps} from 'next-cloudinary'

import { ChangeEvent, useMemo, useState } from "react";
import { CloudinaryResponse } from "./interface.file";
import toast from "react-hot-toast";

// import { ChangeEvent, useState } from "react";
// import {} from "next-cloudinary";
// import toast from "react-hot-toast";

// interface UseUploadFileOptions {
//   multiply: boolean;
// }

// // type TFiles =

// export const useUploadFile = (options?: UseUploadFileOptions) => {
//   //   const url = "https://api.cloudinary.com/v1_1/daswkls85/image/upload";
//   //   const url = "https://api.cloudinary.com/v1_1/daswkls85/image/destroy";
//   const [attachments, setAttachments] = useState<any[]>([]);

//   const upload = async (file: File) => {
//     const file_type = file.type.split("/")[0];
//     const resource_type = file_type === "image" ? "image" : file_type === "video" ? "video" : "raw";
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "wfz11ll4");
//     const f = await fetch(`https://api.cloudinary.com/v1_1/daswkls85/${resource_type}/upload`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       body: formData,
//     }).then((res) => res.json());
//     console.log("UPLOADED FILE HERE", f);
//   };
//   const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length == 0) return;
//     if (files.length > 4) return toast.error("Please choose either 1 video or up to 4 photos.");
//     // if (files.length > 4) return console.log('Please choose either 1 video or up to 4 photos.');
//     // if (files.length + attachments.length > 4)
//     //   return toast.error("Please choose either 1 video or up to 4 photos.");
//     const resource_type = validateResourceType(files);
//     if (!resource_type) return toast.error("Please choose either 1 video or up to 4 photos.");
//     // setAttachmentsPreview(new Array(files.length).fill({ resource_type }));
//     // mutateAsync(files);
//     // const files_uploaded = await Promise.all(f(files));
//     // console.log("files_uploaded", files_uploaded);
//     // setAttachments((prev) => [...prev, ...files_uploaded]);
//   };
//   const validateResourceType = (files: FileList) => {
//     const types = [];
//     for (const file of files) {
//       const type = file.type.split("/")[0];
//       types.push(type);
//     }
//     const isImages = types.every((el) => el === "image");
//     if (isImages) return "image";
//     const isVideo = types.length === 1 && types[0] === "video";
//     if (isVideo) return "video";
//     return false;
//   };
//   return {
//     uploadFile,
//   };
// };
// export interface UseUploadOptionsProps {
//   multiply?: boolean;
//   max?: number;
//   min?: number;
//   accept_default?: "image" | "video" | "auto";
// }
// export const useUploadFile = ({
//   accept_default = "auto",
//   max = 4,
//   min = 1,
//   multiply = false,
// }: UseUploadOptionsProps) => {
//   const [attachments, setAttachments] = useState<any[]>([]);
//   // const [accept, setAccept] = useState('')
//   const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;

//     console.log(files);
//     if (!files || files.length == 0) return;
//     if (!multiply && files.length > 1) {
//       return toast.error(`Please choose either 1 video or up to ${max} photos.`);
//     }
//     if (attachments.length + files.length > max) {
//       return toast.error(`Please choose either 1 video or up to ${max} photos.`);
//     }
//     const typeValid = validateResourceType(files)
//     if(typeValid && typeValid === )
//     // const file_type = files.type.split("/")[0];
//     // const fileType = files.item;
//     // const resource_type = file_type === "image" ? "image" : file_type === "video" ? "video" : "raw";
//   };
//   const validateResourceType = (files: FileList) => {
//     if (files.length === 0) return false;

//     const types: string[] = [];
//     for (const file of files) {
//       const type = file.type.split("/")[0];
//       types.push(type);
//     }
//     if (types.length === 1) {
//     }

//     const everySame = types.every((el) => el === types[0]);
//     if (everySame) {
//       if (attachments.length > 0) {
//         if (types[0] === attachments[0].resource_type) return types[0];
//         else return false;
//       } else {
//         return types[0];
//       }
//     } else {
//       return false;
//     }
//   };
//   return {
//     uploadFile,
//   };
// };

export interface UseUploadOptionsProps {
  multiply?: boolean;
  max?: number;
  min?: number;
  accept_default?: "image" | "video" | "auto";
}
type AcceptFiles = "image/*" | "video/*" | "image/* ,video/*";
export const useUploadFile = ({
  accept_default = "auto",
  max = 4,
  min = 1,
  multiply = false,
}: UseUploadOptionsProps) => {
  const [attachments, setAttachments] = useState<CloudinaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const accept: AcceptFiles = useMemo(() => {
    if (attachments.length === 0) {
      if (accept_default === "auto") {
        return "image/* ,video/*";
      } else {
        return `${accept_default}/*`;
      }
    } else {
      return `${attachments[0].resource_type}/*` as any;
    }
  }, [attachments]);
  const uploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true);
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const allFilesCount = files.length + attachments.length;
      if (!multiply && allFilesCount > 1) {
        return toast.error("Select only one file");
      }
      if (multiply && allFilesCount > max) {
        return toast.error(`Please choose either 1 video or up to ${max} photos.`);
      }
      const existVideoInAttachments = attachments.some((el) => el.resource_type === "video");
      if (existVideoInAttachments) {
        return toast.error(`Please choose either 1 video or up to ${max} photos.`);
      }
      const typeValid = validateTypeFiles(files);
      if (typeValid === "video" && files.length > 1) {
        return toast.error(`Please choose either 1 video or up to ${max} photos.`);
      }
      if (!!typeValid) {
        if (attachments.length > 0 && attachments[0].resource_type !== typeValid) return;
        const file_promises = uploadAllFiles(files);
        const file_uploaded = await Promise.all(file_promises);
        setAttachments((prev) => [...prev, ...file_uploaded]);
        console.log(file_uploaded);
      } else return;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const validateTypeFiles = (files: FileList) => {
    const types: string[] = [];
    for (const file of files) {
      const type = file.type.split("/")[0];
      types.push(type);
    }
    const isOk = types.every((el) => el === types[0]);
    if (isOk) return types[0];
    else return false;
  };
  const uploadAllFiles = (files: FileList) => {
    const promises = [];
    for (const file of files) {
      promises.push(upload(file));
    }
    return promises;
  };
  const upload = async (file: File) => {
    const resource_type = file.type.split("/")[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "wfz11ll4");
    return fetch(`https://api.cloudinary.com/v1_1/daswkls85/${resource_type}/upload`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    }).then((res) => res.json());
  };
  const remove = (public_id: string) => {
    setAttachments((prev) => prev.filter((el) => el.public_id !== public_id));
  };
  const clear = () => {
    setAttachments([]);
  };
  return {
    accept,
    attachments,
    isLoading,
    uploadFile,
    remove,
    clear,
  };
};
