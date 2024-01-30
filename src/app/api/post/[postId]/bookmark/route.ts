import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function POST(req: Request, { params }: { params: { postId: string } }) {
  try {
    const postId = +params.postId;
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const bookmarkExist = await prisma.bookmark.findFirst({
      where: {
        postId,
        userId: session.user.id,
      },
    });
    if (bookmarkExist) {
      const res = await prisma.bookmark.delete({
        where: {
          id: bookmarkExist.id,
        },
      });
      return NextResponse.json({ isMarked: false, bookmark: null });
    } else {
      const bookmark = await prisma.bookmark.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
      return NextResponse.json({
        bookmark,
        isMarked: true,
      });
    }
    // return NextResponse.json({ postId });
  } catch (error) {
    return NextResponse.json("Something went wrong. Try again!", {
      status: 400,
    });
  }
}
