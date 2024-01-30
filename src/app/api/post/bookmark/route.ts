import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    const marks = await prisma.user.findFirst({
      where: { id: session.user.id },
      select: {
        bookmarks: {
          select: {
            id: true,
          },
        },
      },
    });
    const ids = marks?.bookmarks.map((el) => el.id) ?? [];

    const posts = await prisma.bookmark.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        post: {
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
        },
      },
      skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json("Something went wrong. Try again!", {
      status: 400,
    });
  }
}
