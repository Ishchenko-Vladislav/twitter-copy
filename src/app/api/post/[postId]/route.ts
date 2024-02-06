import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BaseResponse, Response } from "@/lib/interface";
import { Prisma } from "@prisma/client";
export interface PostResponse extends BaseResponse<TPost> {}

export type TPost = Prisma.PostGetPayload<{
  include: {
    user: true;
    attachments: true;
    likes: true;
    bookmarks: true;
    _count: {
      select: {
        likes: true;
        comments: true;
        bookmarks: true;
      };
    };
  };
}>;

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
): Promise<NextResponse<PostResponse>> {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(params.postId),
      },
      include: {
        user: true,
        attachments: true,
        likes: {
          where: {
            userId: session?.user.id,
          },
        },
        bookmarks: {
          where: {
            userId: session?.user.id,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "This post does not exist.",
        data: null,
      });
    }
    return NextResponse.json({
      success: true,
      data: post,
      message: "",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Try again!",
        data: null,
      },
      {
        status: 400,
      }
    );
  }
}
