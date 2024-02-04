import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { PostLike } from "@prisma/client";
export interface LikeResponse extends BaseResponse {
  data?: {
    like: PostLike;
    isLiked: true;
  };
}
export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
): Promise<NextResponse<LikeResponse>> {
  try {
    const postId = +params.postId;
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
      });
    }
    const likeExist = await prisma.postLike.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });
    if (likeExist) {
      const res = await prisma.postLike.delete({
        where: {
          id: likeExist.id,
        },
      });
      return NextResponse.json({
        success: true,
        message: "",
      });
    } else {
      const like = await prisma.postLike.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
      return NextResponse.json({
        success: true,
        message: "",
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Try again!",
      },
      {
        status: 400,
      }
    );
  }
}
