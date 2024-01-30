import { Post, PostAttachment } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export interface ICreatePostDTO {
  text: Post["text"];
  attachments: {
    publicId: string;
    type: "image" | "video";
    url: string;
  }[];
  userId: Post["userId"] | undefined;
}
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const data: ICreatePostDTO = await req.json();
    if (!data.userId) {
      return NextResponse.json("unauthorized", { status: 401 });
    }
    const res = await prisma.post.create({
      data: {
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
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json("Something went wrong. Try again!", {
      status: 400,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const res = await prisma.post.findMany({
      include: {
        attachments: true,
        user: true,
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
      skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json("Something went wrong. Try again!", {
      status: 400,
    });
  }
}
