import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
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
    const posts = await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId: params.userId,
          },
        },
      },
      include: {
        user: {
          select: {
            avatar: true,
            name: true,
            id: true,
            username: true,
            _count: {
              select: {
                following: true,
                followers: true,
              },
            },
          },
        },
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
      skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
