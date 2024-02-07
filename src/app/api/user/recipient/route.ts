import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { NextRequest, NextResponse } from "next/server";
export interface RecipientResponse extends BaseResponse<User[]> {}
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
export async function GET(req: NextRequest): Promise<NextResponse<RecipientResponse>> {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        data: null,
        message: "You should be logged in.",
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const q = searchParams.get("q");
    let query = q;
    if (query?.startsWith("@")) {
      query = query.slice(1);
    }
    console.log("query", query);
    // const take = searchParams.get("take");
    // const skip = searchParams.get("skip");
    const recipients = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: String(query),
            },
          },
          {
            username: {
              contains: String(query),
            },
          },
        ],
      },
    });
    return NextResponse.json({
      data: recipients,
      message: "",
      success: true,
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
