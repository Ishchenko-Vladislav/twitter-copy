import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
export interface BookmarkResponse extends BaseResponse<any> {}

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
): Promise<NextResponse<BookmarkResponse>> {
  try {
    const postId = +params.postId;
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
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
      return NextResponse.json({ success: true, data: null, message: "" });
    } else {
      const bookmark = await prisma.bookmark.create({
        data: {
          postId,
          userId: session.user.id,
        },
      });
      return NextResponse.json({
        success: true,
        data: null,
        message: "",
      });
    }
    // return NextResponse.json({ postId });
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
