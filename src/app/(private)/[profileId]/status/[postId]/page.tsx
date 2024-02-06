import { SimpleHeader } from "@/components/headers/SimpleHeader";
import React from "react";
import Post from "../../components/p/post/Post";
import { CreateComment } from "../../components/p/create-comment/CreateComment";
import { Comments } from "../../components/p/comments/Comments";

interface Props {
  params: {
    postId: string;
  };
}

const page = ({ params }: Props) => {
  return (
    <div className="flex flex-col">
      <SimpleHeader title="Post" withArrow />
      <Post />
      <CreateComment />
      <Comments />
    </div>
  );
};

export default page;
