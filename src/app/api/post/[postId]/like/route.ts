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
      return NextResponse.json({ isLiked: false, like: null });
    } else {
      const like = await prisma.postLike.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
      return NextResponse.json({
        like,
        isLiked: true,
      });
    }
    // return NextResponse.json({ postId });
  } catch (error) {
    return NextResponse.json("Something went wrong. Try again!", {
      status: 400,
    });
  }
}
