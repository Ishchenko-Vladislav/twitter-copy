import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { BaseResponse } from "@/lib/interface";
export type ConversationResponse = Prisma.ConversationGetPayload<{
  include: {
    member: {
      include: {
        _count: {
          select: {
            followers: true;
            following: true;
          };
        };
      };
    };
  };
}>;
export interface GetConversationResponse extends BaseResponse<ConversationResponse> {}

export async function GET(
  req: NextRequest,
  { params }: { params: { conversationId: string } }
): Promise<NextResponse<GetConversationResponse>> {
  try {
    const conversationId = parseInt(params.conversationId);
    const session = await auth();
    if (!session?.user.id) {
      return NextResponse.json({
        success: false,
        message: "You should be logged in.",
        data: null,
      });
    }
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        member: {
          include: {
            _count: {
              select: {
                followers: true,
                following: true,
              },
            },
          },
        },
        lastMessageSend: true,
      },
    });
    return NextResponse.json({
      success: true,
      message: "",
      data: conversation,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong. Try again!",
      data: null,
    });
  }
}
