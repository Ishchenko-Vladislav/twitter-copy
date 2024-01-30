import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        isError: true,
        message: "You should be logged in.",
      });
    }
    const userId = params.userId;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        _count: {
          select: {
            followers: true,
            following: true,
          },
        },
      },
    });
    if (!user) {
      return NextResponse.json({
        message: "This user does't exist",
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
