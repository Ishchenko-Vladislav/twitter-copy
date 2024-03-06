import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { BaseResponse } from "@/lib/interface";
import { ConversationType, Prisma } from "@prisma/client";
export type ConversationResponse = Prisma.ConversationGetPayload<{
  include: {
    member: true;
    lastMessageSend: true;
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
    const take = parseInt(searchParams.get("take") ?? "10");
    // const skip = searchParams.get("skip");
    const date = searchParams.get("date") ?? new Date(Date.now());

    const conversation = await prisma.conversation.findMany({
      where: {
        updatedAt: {
          lte: date,
        },
        member: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        member: true,
        lastMessageSend: true,
      },
      // skip: skip ? +skip : 0,
      take: take ? +take : 5,
      orderBy: {
        updatedAt: "desc",
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
    const ids = data.members.map((el: any) => el.id) ?? [];

    const isExist = await prisma.conversation.findFirst({
      where: {
        member: {
          every: {
            id: {
              in: ids,
            },
          },
        },
        type: "private",
      },
      include: {
        member: true,
        lastMessageSend: true,
      },
    });
    if (isExist) {
      return NextResponse.json({
        success: true,
        message: "Something went wrong. Try again!",
        data: isExist,
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
        lastMessageSend: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "",
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
