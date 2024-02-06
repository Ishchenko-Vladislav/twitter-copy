import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BaseResponse } from "@/lib/interface";
export interface LikeToCommentResponse extends BaseResponse<any> {}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string; commentId: string } }
): Promise<NextResponse<LikeToCommentResponse>> {
  try {
    const postId = parseInt(params.postId);
    const commentId = parseInt(params.commentId);
    if (!postId || !commentId) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "Invalid",
      });
    }
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "You should be logged in.",
      });
    }
    const likeExist = await prisma.commentLike.findFirst({
      where: {
        userId: session.user.id,
      },
    });
    if (likeExist) {
      const res = await prisma.commentLike.delete({
        where: {
          id: likeExist.id,
        },
      });
      return NextResponse.json({
        data: null,
        message: "",
        success: true,
      });
    } else {
      const res = await prisma.commentLike.create({
        data: {
          userId: session.user.id,
          commentId: commentId,
        },
      });
      return NextResponse.json({
        data: null,
        message: "",
        success: true,
      });
    }
    // return NextResponse.json({
    //   success: false,
    //   data: null,
    //   message: "You should be logged in.",
    // });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      message: "Something went wrong. Try again!",
    });
  }
}
