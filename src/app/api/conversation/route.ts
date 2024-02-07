import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { ConversationType, Prisma } from "@prisma/client";
export type ConversationResponse = Prisma.ConversationGetPayload<{
  include: {
    member: true;
  };
}>;
export interface GetConversationResponse extends BaseResponse<ConversationResponse[]> {}
export interface CreateConversationResponse extends BaseResponse<ConversationResponse> {}
export interface CreateConversationDTO {
  type: ConversationType;
  members: {
    id: string;
  }[];
}
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }
    const searchParams = req.nextUrl.searchParams;
    const take = searchParams.get("take");
    const skip = searchParams.get("skip");
    const conversation = await prisma.conversation.findMany({
      where: {
        member: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        member: true,
      },
      skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(conversation);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Try again!",
      data: null,
    });
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<CreateConversationResponse>> {
  try {
    const data = await req.json();
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }
    const conv = await prisma.conversation.create({
      data: {
        type: data.type,
        member: {
          connect: data.members,
        },
      },
      include: {
        member: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Something went wrong. Try again!",
      data: conv,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Try again!",
      data: null,
    });
  }
}
