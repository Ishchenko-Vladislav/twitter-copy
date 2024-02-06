import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { NextRequest, NextResponse } from "next/server";
export interface CommentResponse extends BaseResponse<TComment> {}
import prisma from "@/lib/prisma";
import { Comment, Prisma } from "@prisma/client";
export type TComment = Prisma.CommentGetPayload<{
  include: {
    attachments: true;
    user: {
      select: {
        avatar: true;
        id: true;
        name: true;
        username: true;
        _count: {
          select: {
            followers: true;
            following: true;
          };
        };
      };
    };
    likes: true;
    _count: {
      select: {
        likes: true;
      };
    };
  };
}>;
export interface ICreateCommentDTO {
  text: TComment["text"];
  attachments: {
    publicId: string;
    type: "image" | "video";
    url: string;
  }[];
  userId: Comment["userId"] | undefined;
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
): Promise<NextResponse<CommentResponse>> {
  try {
    const postId = parseInt(params.postId);
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "You should be logged in.",
      });
    }
    const data: ICreateCommentDTO = await req.json();
    if (!data.userId) {
      return NextResponse.json(
        {
          data: null,
          message: "unauthorized",
          success: false,
        },
        { status: 401 }
      );
    }
    const comment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: data.userId,
        text: data.text,
        attachments: {
          create: data.attachments.map((el) => ({
            publicId: el.publicId,
            type: el.type,
            url: el.url,
          })),
        },
      },
      include: {
        attachments: true,
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
            username: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
        likes: {
          where: {
            userId: session.user.id,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "",
      data: comment,
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

export async function GET(req: NextRequest, { params }: { params: { postId: string } }) {
  try {
    const postId = parseInt(params.postId);
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "You should be logged in.",
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: {
        attachments: true,
        user: {
          select: {
            avatar: true,
            id: true,
            name: true,
            username: true,
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
        likes: {
          where: {
            userId: session.user.id,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
      skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(comments);
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
