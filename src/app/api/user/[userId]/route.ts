import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params.userId;
    const userPromise = prisma.user.findUnique({
      where: {
        id: userId,
      },
      // include: { followers: true, following: true },
    });
    const followingCount = prisma.follows.count({
      where: {
        userId: userId,
      },
    });
    const followersCount = prisma.follows.count({
      where: {
        recipientId: userId,
      },
    });
    const [user, f, c] = await Promise.all([userPromise, followersCount, followingCount]);
    if (!user) {
      return NextResponse.json({
        message: "This user does't exist",
      });
    }
    return NextResponse.json({
      ...user,
      followersCount: f,
      followingCount: c,
    });
    console.log("HERE USERID", userId);
    // return NextResponse.next();
  } catch (error) {
    return NextResponse.json("something went wrong", { status: 400 });
  }
}
