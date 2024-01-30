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
    const userId = params.userId;

    const res = await prisma.follows.findMany({
      where: {
        userId: userId,
      },
      include: {
        recipient: {
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
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
